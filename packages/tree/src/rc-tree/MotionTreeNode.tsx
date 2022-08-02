import React from 'react';
import { TreeContext } from './contextTypes';
import type { FlattenNode } from './interface';
import type { TreeNodeProps } from './TreeNode';
import TreeNode from './TreeNode';
import type { TreeNodeRequiredProps } from './utils/treeUtil';

interface MotionTreeNodeProps extends Omit<TreeNodeProps, 'domRef'> {
  active: boolean;
  motion?: any;
  motionNodes?: FlattenNode[];
  onMotionStart: () => void;
  onMotionEnd: () => void;
  motionType?: 'show' | 'hide';

  treeNodeRequiredProps: TreeNodeRequiredProps;
}

const MotionTreeNode: React.ForwardRefRenderFunction<HTMLDivElement, MotionTreeNodeProps> = (
  {
    className,
    style,
    motion,
    motionNodes,
    motionType,
    onMotionStart: onOriginMotionStart,
    onMotionEnd: onOriginMotionEnd,
    active,
    treeNodeRequiredProps,
    ...props
  },
  ref,
) => {
  const [visible, setVisible] = React.useState(true);
//   const { prefixCls } = React.useContext(TreeContext);

//   const motionedRef = React.useRef(false);
  return <TreeNode domRef={ref} className={className} style={style} {...props} active={active} />;
};

MotionTreeNode.displayName = 'MotionTreeNode';

const RefMotionTreeNode = React.forwardRef(MotionTreeNode);

export default RefMotionTreeNode;
