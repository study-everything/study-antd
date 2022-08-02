import type { BasicDataNode, DataEntity, DataNode, Key } from "../interface";

/* eslint-disable import/prefer-default-export */
export function getKey(key: Key, pos: string) {
  if (key !== null && key !== undefined) {
    return key;
  }
  return pos;
}

export interface TreeNodeRequiredProps<TreeDataType extends BasicDataNode = DataNode> {
    expandedKeys: Key[];
    selectedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    checkedKeys: Key[];
    halfCheckedKeys: Key[];
    dragOverNodeKey: Key;
    dropPosition: number;
    keyEntities: Record<Key, DataEntity<TreeDataType>>;
  }

/**
 * Get TreeNode props with Tree props.
 */
 export function getTreeNodeProps<TreeDataType extends BasicDataNode = DataNode>(
    key: Key,
    {
      expandedKeys,
      selectedKeys,
      loadedKeys,
      loadingKeys,
      checkedKeys,
      halfCheckedKeys,
      dragOverNodeKey,
      dropPosition,
      keyEntities,
    }: TreeNodeRequiredProps<TreeDataType>,
  ) {
    const entity = keyEntities[key];
  
    const treeNodeProps = {
      eventKey: key,
      expanded: expandedKeys.indexOf(key) !== -1,
      selected: selectedKeys.indexOf(key) !== -1,
      loaded: loadedKeys.indexOf(key) !== -1,
      loading: loadingKeys.indexOf(key) !== -1,
      checked: checkedKeys.indexOf(key) !== -1,
      halfChecked: halfCheckedKeys.indexOf(key) !== -1,
      pos: String(entity ? entity.pos : ''),
  
      // [Legacy] Drag props
      // Since the interaction of drag is changed, the semantic of the props are
      // not accuracy, I think it should be finally removed
      dragOver: dragOverNodeKey === key && dropPosition === 0,
      dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
      dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1,
    };
  
    return treeNodeProps;
  }