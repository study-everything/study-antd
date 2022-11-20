import { tuple } from './type';

const SelectPlacements = tuple('bottomLeft', 'bottomRight', 'topLeft', 'topRight');
export type SelectCommonPlacement = typeof SelectPlacements[number];

const getTransitionDirection = (placement: SelectCommonPlacement | undefined) => {
  if (placement !== undefined && (placement === 'topLeft' || placement === 'topRight')) {
    return `slide-down`;
  }
  return `slide-up`;
};

const getTransitionName = (rootPrefixCls: string, motion: string, transitionName?: string) => {
  if (transitionName !== undefined) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};
export { getTransitionName, getTransitionDirection };
