// import type { CSSMotionProps, MotionEndEventHandler, MotionEventHandler } from 'rc-motion';
// import type { MotionEvent } from 'rc-motion/lib/interface';
// import { tuple } from './type';

// ================== Collapse Motion ==================
const getCollapsedHeight = () => ({ height: 0, opacity: 0 });
const getRealHeight = node => {
  const { scrollHeight } = node;
  return { height: scrollHeight, opacity: 1 };
};
const getCurrentHeight = node => ({ height: node ? node.offsetHeight : 0 });
const skipOpacityTransition = (_, event) =>
  event?.deadline === true || (event).propertyName === 'height';

const collapseMotion  = {
  motionName: 'ant-motion-collapse',
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
};

// const SelectPlacements = tuple('bottomLeft', 'bottomRight', 'topLeft', 'topRight');
// export type SelectCommonPlacement = typeof SelectPlacements[number];

const getTransitionDirection = (placement) => {
  if (placement !== undefined && (placement === 'topLeft' || placement === 'topRight')) {
    return `slide-down`;
  }
  return `slide-up`;
};

const getTransitionName = (rootPrefixCls, motion, transitionName) => {
  if (transitionName !== undefined) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};
export { getTransitionName, getTransitionDirection };
export default collapseMotion;
