# Antd Tree的实现

## 问题

1. 如何实现层级的显示（缩进）？
2. 如何实现展开收起
3. 如何实现级联选择？
5. 如何实现拖动？
6. 如何实现受控和非受控的结合



### 如何实现层级的显示（缩进）？

有一个`Indent`组件，接收一个level参数，而level就是具体节点在data所在的层级，level越大Indent渲染的宽度越大。它会渲染在每个节点的前面

### 如何实现展开收起？

除了动画效果之外，核心的实现就是一个`flattenTreeData`函数

通过传入原始数据和expandedKeys，可以计算出接下来页面上应该渲染的节点集合，而被收起的节点就不会出现在这里

```typescript
// 这个函数就是能时时计算出所有需要展示的节点
export function flattenTreeData<TreeDataType extends BasicDataNode = DataNode>(
  treeNodeList: TreeDataType[],
  expandedKeys: Key[] | true,
  fieldNames: FieldNames,
): FlattenNode<TreeDataType>[] {
  const {
    _title: fieldTitles,
    key: fieldKey,
    children: fieldChildren,
  } = fillFieldNames(fieldNames);

  const expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  const flattenList: FlattenNode<TreeDataType>[] = [];

  function dig(
    list: TreeDataType[],
    parent: FlattenNode<TreeDataType> = null,
  ): FlattenNode<TreeDataType>[] {
    return list.map((treeNode, index) => {
      const pos: string = getPosition(parent ? parent.pos : '0', index);
      const mergedKey = getKey(treeNode[fieldKey], pos);

      // Pick matched title in field title list
      let mergedTitle: React.ReactNode;
      for (let i = 0; i < fieldTitles.length; i += 1) {
        const fieldTitle = fieldTitles[i];
        if (treeNode[fieldTitle] !== undefined) {
          mergedTitle = treeNode[fieldTitle];
          break;
        }
      }

      // Add FlattenDataNode into list
      const flattenNode: FlattenNode<TreeDataType> = {
        ...omit(treeNode, [...fieldTitles, fieldKey, fieldChildren] as any),
        title: mergedTitle,
        key: mergedKey,
        parent,
        pos,
        children: null,
        data: treeNode,
        isStart: [...(parent ? parent.isStart : []), index === 0],
        isEnd: [...(parent ? parent.isEnd : []), index === list.length - 1],
      };

      flattenList.push(flattenNode);

      // 关键在这里，如果当前node不在expandedKeySet里面，即使它有children，也直接跳过，这样它的儿子们也就不会被遍历到
      // Loop treeNode children
      if (expandedKeys === true || expandedKeySet.has(mergedKey)) {
        flattenNode.children = dig(treeNode[fieldChildren] || [], flattenNode);
      } else {
        flattenNode.children = [];
      }

      return flattenNode;
    });
  }

  dig(treeNodeList);

  return flattenList;
}
```



### 如何实现级联选择？

其实没有什么高级的概念，只是一些简单算法的集合，计算时需要几个参数

1. 所有的节点集合`keyEntities`
2. 之前所有被check的节点集合`oriCheckedKeys`
3. 之前部分被check的节点集合`halfCheckedKeys`

此时两种场景

- 当check一个节点

1. 收集每个层级的所有节点，维护在`levelEntities`中，即key为层级(0/1/2/3/...)，value为一个node set （下面反选也一样）
2. 自顶向下添加`checkedKeys`
   1. 从`levelEntities`的顶层开始遍历，也是就是树的顶层，如果当前节点在`oriCheckedKeys`里面，那么它的所有子节点也会被直接加入checkedKeys
   2. 一直遍历到叶子节点为止，这个操作可以让父节点被checked后，子节点批量被打标，此时不需要考虑halfCheck的情况
3. 自底向上添加`checkedKeys`，这个操作是为了识别到check了叶子节点，然后会影响到父节点，乃至兄弟节点的情况
   1. 从`levelEntities`的底层开始遍历，直接拿出当前节点的parent节点，并遍历其所有的children，如果所有的children都被checked了，那么父节点也会加入checkedKeys，否则给父打一个halfChecked的标
4. 这两次遍历完成后，会得到一个checkedKeys和halfCheckedKeys，而一个父节点是可能同时出现在两个set里面的，此时把halfCheckedKeys过滤掉checkedKeys的元素，则得到了真正的halfCheckedKeys

- 当uncheck一个节点

基本和上面的的步骤一致，实际的操作相反而已，上面是添加的checkedKeys，这里是从checkedKeys中移除

具体见`study-antd/packages/tree/src/rc-tree/utils/conductUtil.ts`中的`conductCheck`方法



### 如何实现拖动？

其实就是对原生H5 API的增强，本质还是利用原生drag&drop的能力，增强的点如

- 在DragStart的时候，如果拖动的是有子节点的父节点，会把它自动缩起。同时记录下被拖拽节点以及它的所有（到叶子节点）节点的信息
- 在DragEnter的时候，如果进入了一个非自身的节点，那就要把它展开，同时记录一个潜在的drop位置
- 在DragOver的时候，通过计算，得到拖拽节点在当前节点列表中的位置，同样记录并覆盖之前的潜在drop位置

- 在DragLevel的时候，重置之前记录的Drag信息
- 当Drop的时候，取出之前存的潜在drop位置信息，然后将它作为参数传给用户传入的onDrop函数



### 如何实现受控和非受控的结合

核心在下面这个函数，每次某个操作比如onExpand时，调用这个方法去setState，它会判断这次要改的这个state（expandedKeys），是不是props中有传进来，如果props里存在，那么就跳过。 

这样在非受控模式下，自己更新自己的状态，受控模式下由props来控制状态的变化

```typescript
  /**
   * Only update the value which is not in props
   */
  setUncontrolledState = (
    state: Partial<TreeState<TreeDataType>>,
    // 用在同时要更新两个或以上属性时，一般来说属性是有关联的，比如flattenNodes和flattenNodes，atomic的作用就是要么两个都更新，要么都不更新
    atomic: boolean = false, 
    forceState: Partial<TreeState<TreeDataType>> | null = null, // 表示一旦更新那么会强制更新到的属性
  ) => {
    if (!this.destroyed) {
      let needSync = false; // 是否需要更新
      let allPassed = true; // 默认非受控
      const newState = {};

      Object.keys(state).forEach(name => {
        if (name in this.props) {
          allPassed = false; // 一旦这个state属性在props里有，表示检查失败，不会执行下面的setState
          return;
        }

        needSync = true; // 一旦有一个属性不在props里面，那就要执行setState
        newState[name] = state[name];
      });

      if (needSync && (!atomic || allPassed)) {
        this.setState({
          ...newState,
          ...forceState,
        } as TreeState<TreeDataType>);
      }
    }
  };
```
