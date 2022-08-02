import React from 'react';
import VirtualList, { ListRef } from 'rc-virtual-list';
import { DataEntity, FlattenNode, Key, ScrollTo } from './interface';
import { getKey, getTreeNodeProps } from './utils/treeUtil';

const HIDDEN_STYLE = {
  width: 0,
  height: 0,
  display: 'flex',
  overflow: 'hidden',
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0,
};

interface NodeListProps<TreeDataType> {
  prefixCls: string;
  style: React.CSSProperties;
  data: FlattenNode<TreeDataType>[];
  motion: any;
  focusable?: boolean;
  activeItem: FlattenNode<TreeDataType>;
  focused?: boolean;
  tabIndex: number;
  checkable?: boolean;
  selectable?: boolean;
  disabled?: boolean;

  expandedKeys: Key[];
  selectedKeys: Key[];
  checkedKeys: Key[];
  loadedKeys: Key[];
  loadingKeys: Key[];
  halfCheckedKeys: Key[];
  keyEntities: Record<Key, DataEntity<any>>;

  dragging: boolean;
  dragOverNodeKey: Key;
  dropPosition: number;

  // Virtual list
  height: number;
  itemHeight: number;
  virtual?: boolean;

  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onActiveChange: (key: Key) => void;

  onListChangeStart: () => void;
  onListChangeEnd: () => void;
}

export interface NodeListRef {
  scrollTo: ScrollTo;
  getIndentWidth: () => number;
}

function itemKey(item: FlattenNode) {
  const { key, pos } = item;
  return getKey(key, pos);
}

const NodeList = React.forwardRef<NodeListRef, NodeListProps<any>>((props, ref) => {
  const {
    prefixCls,
    data,
    selectable,
    checkable,
    expandedKeys,
    selectedKeys,
    checkedKeys,
    loadedKeys,
    loadingKeys,
    halfCheckedKeys,
    keyEntities,
    disabled,

    dragging,
    dragOverNodeKey,
    dropPosition,
    motion,

    height,
    itemHeight,
    virtual,

    focusable,
    activeItem,
    focused,
    tabIndex,

    onKeyDown,
    onFocus,
    onBlur,
    onActiveChange,

    onListChangeStart,
    onListChangeEnd,

    ...domProps
  } = props;

  const listRef = React.useRef<ListRef>(null);
  const indentMeasurerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => ({
    scrollTo: scroll => {
      listRef.current.scrollTo(scroll);
    },
    getIndentWidth: () => indentMeasurerRef.current.offsetWidth,
  }));

  const [prevExpandedKeys, setPrevExpandedKeys] = React.useState(expandedKeys);
  const [prevData, setPrevData] = React.useState(data);
  const [transitionData, setTransitionData] = React.useState(data);
  const [transitionRange, setTransitionRange] = React.useState([]);
  const [motionType, setMotionType] = React.useState<'show' | 'hide' | null>(null);

  const mergedData = motion ? transitionData : data;

  const treeNodeRequiredProps = {
    expandedKeys,
    selectedKeys,
    loadedKeys,
    loadingKeys,
    checkedKeys,
    halfCheckedKeys,
    dragOverNodeKey,
    dropPosition,
    keyEntities,
  };

  return (
    <VirtualList<FlattenNode>
      {...domProps}
      data={mergedData}
      itemKey={itemKey}
      height={height}
      fullHeight={false}
      virtual={virtual}
      itemHeight={itemHeight}
      prefixCls={`${prefixCls}-list`}
      ref={listRef}
    //   onVisibleChange={(originList, fullList) => {
        // const originSet = new Set(originList);
        // const restList = fullList.filter(item => !originSet.has(item));

        // Motion node is not render. Skip motion
        // if (restList.some(item => itemKey(item) === MOTION_KEY)) {
        //   onMotionEnd();
        // }
    //   }}
    >
      {treeNode => {
        const {
          pos,
          data: { ...restProps },
          title,
          key,
          isStart,
          isEnd,
        } = treeNode;
        const mergedKey = getKey(key, pos);
        delete restProps.key;
        delete restProps.children;

        const treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);

        return (
          <MotionTreeNode
            {...(restProps as Omit<typeof restProps, 'children'>)}
            {...treeNodeProps}
            title={title}
            active={!!activeItem && key === activeItem.key}
            pos={pos}
            data={treeNode.data}
            isStart={isStart}
            isEnd={isEnd}
            motion={motion}
            motionNodes={key === MOTION_KEY ? transitionRange : null}
            motionType={motionType}
            onMotionStart={onListChangeStart}
            onMotionEnd={onMotionEnd}
            treeNodeRequiredProps={treeNodeRequiredProps}
            onMouseMove={() => {
              onActiveChange(null);
            }}
          />
        );
      }}
    </VirtualList>
  );
});

export default NodeList;
