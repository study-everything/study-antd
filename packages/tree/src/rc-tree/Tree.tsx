import React from 'react';
import classnames from 'classnames';
import type {
  BasicDataNode,
  DataEntity,
  DataNode,
  Direction,
  EventDataNode,
  FieldNames,
  IconType,
  Key,
} from './interface';
import type {
  NodeDragEventParams,
  NodeMouseEventHandler,
  NodeMouseEventParams,
} from './contextTypes';
import { TreeContext } from './contextTypes';
import DropIndicator from './DropIndicator';

export type ExpandAction = false | 'click' | 'doubleClick';
export type DraggableFn = (node: DataNode) => boolean;
export type DraggableConfig = {
  icon?: React.ReactNode | false;
  nodeDraggable?: DraggableFn;
};
export interface AllowDropOptions<TreeDataType extends BasicDataNode = DataNode> {
  dragNode: TreeDataType;
  dropNode: TreeDataType;
  dropPosition: -1 | 0 | 1;
}
export type AllowDrop<TreeDataType extends BasicDataNode = DataNode> = (
  options: AllowDropOptions<TreeDataType>,
) => boolean;

interface CheckInfo<TreeDataType extends BasicDataNode = DataNode> {
  event: 'check';
  node: EventDataNode<TreeDataType>;
  checked: boolean;
  nativeEvent: MouseEvent;
  checkedNodes: TreeDataType[];
  checkedNodesPositions?: { node: TreeDataType; pos: string }[];
  halfCheckedKeys?: Key[];
}

export interface TreeProps<TreeDataType extends BasicDataNode = DataNode> {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  focusable?: boolean;
  activeKey?: Key;
  tabIndex?: number;
  children?: React.ReactNode;
  treeData?: TreeDataType[]; // Generate treeNode by children
  fieldNames?: FieldNames;
  showLine?: boolean;
  showIcon?: boolean;
  icon?: IconType;
  selectable?: boolean;
  expandAction?: ExpandAction;
  disabled?: boolean;
  multiple?: boolean;
  checkable?: boolean | React.ReactNode;
  checkStrictly?: boolean;
  draggable?: DraggableFn | boolean | DraggableConfig;
  defaultExpandParent?: boolean;
  autoExpandParent?: boolean;
  defaultExpandAll?: boolean;
  defaultExpandedKeys?: Key[];
  expandedKeys?: Key[];
  defaultCheckedKeys?: Key[];
  checkedKeys?: Key[] | { checked: Key[]; halfChecked: Key[] };
  defaultSelectedKeys?: Key[];
  selectedKeys?: Key[];
  allowDrop?: AllowDrop<TreeDataType>;
  titleRender?: (node: TreeDataType) => React.ReactNode;
  dropIndicatorRender?: (props: {
    dropPosition: -1 | 0 | 1;
    dropLevelOffset: number;
    indent: number;
    prefixCls: string;
    direction: Direction;
  }) => React.ReactNode;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: NodeMouseEventHandler;
  onDoubleClick?: NodeMouseEventHandler;
  onScroll?: React.UIEventHandler<HTMLElement>;
  onExpand?: (
    expandedKeys: Key[],
    info: {
      node: EventDataNode<TreeDataType>;
      expanded: boolean;
      nativeEvent: MouseEvent;
    },
  ) => void;
  onCheck?: (
    checked: { checked: Key[]; halfChecked: Key[] } | Key[],
    info: CheckInfo<TreeDataType>,
  ) => void;
  onSelect?: (
    selectedKeys: Key[],
    info: {
      event: 'select';
      selected: boolean;
      node: EventDataNode<TreeDataType>;
      selectedNodes: TreeDataType[];
      nativeEvent: MouseEvent;
    },
  ) => void;
  onLoad?: (
    loadedKeys: Key[],
    info: {
      event: 'load';
      node: EventDataNode<TreeDataType>;
    },
  ) => void;
  loadData?: (treeNode: EventDataNode<TreeDataType>) => Promise<any>;
  loadedKeys?: Key[];
  onMouseEnter?: (info: NodeMouseEventParams<TreeDataType>) => void;
  onMouseLeave?: (info: NodeMouseEventParams<TreeDataType>) => void;
  onRightClick?: (info: { event: React.MouseEvent; node: EventDataNode<TreeDataType> }) => void;
  onDragStart?: (info: NodeDragEventParams<TreeDataType>) => void;
  onDragEnter?: (info: NodeDragEventParams<TreeDataType> & { expandedKeys: Key[] }) => void;
  onDragOver?: (info: NodeDragEventParams<TreeDataType>) => void;
  onDragLeave?: (info: NodeDragEventParams<TreeDataType>) => void;
  onDragEnd?: (info: NodeDragEventParams<TreeDataType>) => void;
  onDrop?: (
    info: NodeDragEventParams<TreeDataType> & {
      dragNode: EventDataNode<TreeDataType>;
      dragNodesKeys: Key[];
      dropPosition: number;
      dropToGap: boolean;
    },
  ) => void;
  /**
   * Used for `rc-tree-select` only.
   * Do not use in your production code directly since this will be refactor.
   */
  onActiveChange?: (key: Key) => void;
  filterTreeNode?: (treeNode: EventDataNode<TreeDataType>) => boolean;
  motion?: any;
  switcherIcon?: IconType;

  // Virtual List
  height?: number;
  itemHeight?: number;
  virtual?: boolean;

  // direction for drag logic
  direction?: Direction;

  rootClassName?: string;
  rootStyle?: React.CSSProperties;
}

const Tree = <TreeDataType extends DataNode | BasicDataNode = DataNode>(
  props: TreeProps<TreeDataType>,
) => {
  const {
    prefixCls,
    className,
    style,
    showLine,
    focusable,
    tabIndex = 0,
    selectable,
    showIcon,
    icon,
    switcherIcon,
    draggable,
    checkable,
    checkStrictly,
    disabled,
    motion,
    loadData,
    filterTreeNode,
    height,
    itemHeight,
    virtual,
    titleRender,
    dropIndicatorRender,
    onContextMenu,
    onScroll,
    direction,
    rootClassName,
    rootStyle,
  } = props;

  const [keyEntities, setKeyEntities] = React.useState<Record<Key, DataEntity<TreeDataType>>>({});
  const [indent, setIndent] = React.useState<number | null>(null);
  const [selectedKeys, setSelectedKeys] = React.useState<Key[]>([]);
  const [checkedKeys, setCheckedKeys] = React.useState<Key[]>([]);
  const [halfCheckedKeys, setHalfCheckedKeys] = React.useState<Key[]>([]);
  const [loadedKeys, setLoadedKeys] = React.useState<Key[]>([]);
  const [loadingKeys, setLoadingKeys] = React.useState<Key[]>([]);
  const [expandedKeys, setExpandedKeys] = React.useState<Key[]>([]);
  const [treeData, setTreeData] = React.useState<TreeDataType[]>([]);
  const [activeKey, setActiveKey] = React.useState<Key>(null);

  const destroyed = React.useRef(false);

  React.useEffect(() => {
    destroyed.current = false;
    return () => {
      // window.removeEventListener('dragend', this.onWindowDragEnd);
      destroyed.current = true;
    };
  }, []);

  React.useEffect(() => {
    const { activeKey: _activeKey } = props;

    if (_activeKey !== undefined && activeKey !== _activeKey) {
      setActiveKey(_activeKey);
      if (_activeKey !== null) {
        // scrollTo({ key: _activeKey });
      }
    }
  }, [props.activeKey]);

  const contextValue = React.useMemo(
    () => ({
      prefixCls,
      selectable,
      showIcon,
      icon,
      switcherIcon,
      // draggable: draggableConfig,
      // draggingNodeKey,
      checkable,
      checkStrictly,
      disabled,
      keyEntities,
      // dropLevelOffset,
      // dropContainerKey,
      // dropTargetKey,
      // dropPosition,
      // dragOverNodeKey,
      indent,
      direction,
      dropIndicatorRender,

      loadData,
      filterTreeNode,

      titleRender,
    }),
    [],
  );

  return (
    <TreeContext.Provider value={contextValue}>
      <div role="tree" style={rootStyle}>123</div>
    </TreeContext.Provider>
  );
};

Tree.defaultProps = {
  prefixCls: 'rc-tree',
  showLine: false,
  showIcon: true,
  selectable: true,
  multiple: false,
  checkable: false,
  disabled: false,
  checkStrictly: false,
  draggable: false,
  defaultExpandParent: true,
  autoExpandParent: false,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: [],
  dropIndicatorRender: DropIndicator,
  allowDrop: () => true,
  expandAction: false,
};

export default Tree;
