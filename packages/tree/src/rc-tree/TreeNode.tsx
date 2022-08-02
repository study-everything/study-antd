import React from 'react';
import classnames from 'classnames';
import type { BasicDataNode, DataNode, IconType, Key } from './interface';
import { TreeContext, TreeContextProps } from './contextTypes';

export interface TreeNodeProps<TreeDataType extends BasicDataNode = DataNode> {
    eventKey?: Key; // Pass by parent `cloneElement`
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
  
    // By parent
    expanded?: boolean;
    selected?: boolean;
    checked?: boolean;
    loaded?: boolean;
    loading?: boolean;
    halfChecked?: boolean;
    title?: React.ReactNode | ((data: TreeDataType) => React.ReactNode);
    dragOver?: boolean;
    dragOverGapTop?: boolean;
    dragOverGapBottom?: boolean;
    pos?: string;
    domRef?: React.Ref<HTMLDivElement>;
    /** New added in Tree for easy data access */
    data?: TreeDataType;
    isStart?: boolean[];
    isEnd?: boolean[];
    active?: boolean;
    onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  
    // By user
    isLeaf?: boolean;
    checkable?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    icon?: IconType;
    switcherIcon?: IconType;
    children?: React.ReactNode;
}

export interface InternalTreeNodeProps extends TreeNodeProps {
    context?: TreeContextProps;
  }

const defaultTitle = '---';

// extends React.Component<InternalTreeNodeProps, TreeNodeState>
const InternalTreeNode = (props: InternalTreeNodeProps) => {
  const [dragNodeHighlight, setDragNodeHighlight] = React.useState(false);

  const hasChildren = () => {
    const { eventKey } = props;
    const {
      context: { keyEntities },
    } = props;
    const { children } = keyEntities[eventKey] || {};

    return !!(children || []).length;
  };

  const isLeaf = () => {
    const { isLeaf: _isLeaf, loaded } = props;
    const {
      context: { loadData },
    } = props;

    const hasChildren = hasChildren();

    if (_isLeaf === false) {
      return false;
    }
    // 当没有传入loadData函数时，如果没有子节点，则认为是叶子节点
    // 当传入loadData函数时，如果没有子节点，且已经加载过， 则认为是叶子节点
    return _isLeaf || (!loadData && !hasChildren) || (loadData && loaded && !hasChildren);
  };

  // Load data to avoid default expanded tree without data
  const syncLoadData = () => {
    const { expanded, loading, loaded } = props;
    const {
      context: { loadData, onNodeLoad },
    } = props;

    if (loading) {
      return;
    }

    // read from state to avoid loadData at same time
    if (loadData && expanded && !isLeaf()) {
      // We needn't reload data when has children in sync logic
      // It's only needed in node expanded
      if (!hasChildren() && !loaded) {
        onNodeLoad(convertNodePropsToEventData(this.props));
      }
    }
  };

  React.useEffect(() => {
    syncLoadData(props);
  })
}

const ContextTreeNode: React.FC<TreeNodeProps> = props => (
  <TreeContext.Consumer>
    {context => <InternalTreeNode {...props} context={context} />}
  </TreeContext.Consumer>
);

ContextTreeNode.displayName = 'TreeNode';

ContextTreeNode.defaultProps = {
  title: defaultTitle,
};

(ContextTreeNode as any).isTreeNode = 1;

export { InternalTreeNode };

export default ContextTreeNode;
