import type { TreeNodeProps } from './TreeNode';

export { ScrollTo } from 'rc-virtual-list/lib/List';
export interface BasicDataNode {
  checkable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  icon?: IconType;
  isLeaf?: boolean;
  selectable?: boolean;
  switcherIcon?: IconType;

  /** Set style of TreeNode. This is not recommend if you don't have any force requirement */
  className?: string;
  style?: React.CSSProperties;
}

export type IconType = React.ReactNode | ((props: TreeNodeProps) => React.ReactNode);

export type Key = string | number;

export type DataNode = FieldDataNode<{
  key: string | number;
  title?: React.ReactNode | ((data: DataNode) => React.ReactNode);
}>;

/** Provide a wrap type define for developer to wrap with customize fieldNames data type */
// TODO
export type FieldDataNode<T, ChildFieldName extends string = 'children'> = BasicDataNode &
  T &
  Partial<Record<ChildFieldName, FieldDataNode<T, ChildFieldName>[]>>;

export interface FieldNames {
  title?: string;
  /** @private Internal usage for `rc-tree-select`, safe to remove if no need */
  _title?: string[];
  key?: string;
  children?: string;
}

export type Direction = 'ltr' | 'rtl' | undefined;

export type EventDataNode<TreeDataType> = {
  key: React.Key;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  loaded: boolean;
  loading: boolean;
  halfChecked: boolean;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  pos: string;
  active: boolean;
} & TreeDataType &
  BasicDataNode;

export type NodeInstance<TreeDataType extends BasicDataNode = DataNode> = React.Component<
  TreeNodeProps<TreeDataType>
> & {
  selectHandle?: HTMLSpanElement;
};

export type NodeElement = React.ReactElement<TreeNodeProps> & {
  selectHandle?: HTMLSpanElement;
  type: {
    isTreeNode: boolean;
  };
};

export interface Entity {
  node: NodeElement;
  index: number;
  key: Key;
  pos: string;
  parent?: Entity;
  children?: Entity[];
}

export interface DataEntity<TreeDataType extends BasicDataNode = DataNode>
  extends Omit<Entity, 'node' | 'parent' | 'children'> {
  node: TreeDataType;
  nodes: TreeDataType[];
  parent?: DataEntity<TreeDataType>;
  children?: DataEntity<TreeDataType>[];
  level: number;
}

export interface FlattenNode<TreeDataType extends BasicDataNode = DataNode> {
  parent: FlattenNode<TreeDataType> | null;
  children: FlattenNode<TreeDataType>[];
  pos: string; // position  I guess should be like 1-1-0-2
  data: TreeDataType;
  title: React.ReactNode;
  key: Key;
  isStart: boolean[];
  isEnd: boolean[];
}
