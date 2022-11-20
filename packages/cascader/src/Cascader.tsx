import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import type {
  BaseOptionType,
  DefaultOptionType,
  FieldNames,
  MultipleCascaderProps as RcMultipleCascaderProps,
  SingleCascaderProps as RcSingleCascaderProps,
} from './rc-cascader';
import RcCascader from './rc-cascader';
import { ConfigContext } from './config-provider';
import type { SizeType } from './config-provider/SizeContext';
import SizeContext from './config-provider/SizeContext';
import type { InputStatus } from './_util/statusUtils';
import type { SelectCommonPlacement } from './_util/motion';
import { getTransitionDirection, getTransitionName } from './_util/motion';
import { getMergedStatus, getStatusClassNames } from './_util/statusUtils';
import { FormItemInputContext } from './form/context';

// Align the design since we use `rc-select` in root. This help:
// - List search content will show all content
// - Hover opacity style
// - Search filter match case

export { BaseOptionType, DefaultOptionType };

export type FieldNamesType = FieldNames;

export type FilledFieldNamesType = Required<FieldNamesType>;

const { SHOW_CHILD, SHOW_PARENT } = RcCascader;

type SingleCascaderProps = Omit<RcSingleCascaderProps, 'checkable' | 'options'> & {
  multiple?: false;
};
type MultipleCascaderProps = Omit<RcMultipleCascaderProps, 'checkable' | 'options'> & {
  multiple: true;
};

type UnionCascaderProps = SingleCascaderProps | MultipleCascaderProps;

export type CascaderProps<DataNodeType> = UnionCascaderProps & {
  multiple?: boolean;
  size?: SizeType;
  disabled?: boolean;
  bordered?: boolean;
  placement?: SelectCommonPlacement;
  suffixIcon?: React.ReactNode;
  options?: DataNodeType[];
  status?: InputStatus;
  /**
   * @deprecated `dropdownClassName` is deprecated which will be removed in next major
   *   version.Please use `popupClassName` instead.
   */
  dropdownClassName?: string;
  popupClassName?: string;
};

export interface CascaderRef {
  focus: () => void;
  blur: () => void;
}

const Cascader = React.forwardRef((props: CascaderProps<any>, ref: React.Ref<CascaderRef>) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    bordered = true,
    className,
    placement,
    direction,
    popupClassName,
    dropdownClassName,
    transitionName,
    status: customStatus,
    ...rest
  } = props;

  const restProps = omit(rest, ['suffixIcon' as any]);

  const {
    // getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    // renderEmpty,
    direction: rootDirection,
    // virtual,
    // dropdownMatchSelectWidth,
  } = useContext(ConfigContext);

  const mergedDirection = direction || rootDirection;
  const isRtl = mergedDirection === 'rtl';

  // =================== Form =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    // feedbackIcon,
  } = useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // ==================== Prefix =====================
  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);

  // =================== Dropdown ====================
  const mergedDropdownClassName = classNames(
    popupClassName || dropdownClassName,
    `${cascaderPrefixCls}-dropdown`,
    {
      [`${cascaderPrefixCls}-dropdown-rtl`]: mergedDirection === 'rtl',
    },
  );

  // ===================== Size ======================
  const size = React.useContext(SizeContext);
  const mergedSize = customizeSize || size;

  // ===================== Placement =====================
  const getPlacement = () => {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl'
      ? ('bottomRight' as SelectCommonPlacement)
      : ('bottomLeft' as SelectCommonPlacement);
  };

  // ==================== Render =====================
  return (
    <RcCascader
      prefixCls={prefixCls}
      className={classNames(
        !customizePrefixCls && cascaderPrefixCls,
        {
          [`${prefixCls}-lg`]: mergedSize === 'large',
          [`${prefixCls}-sm`]: mergedSize === 'small',
          [`${prefixCls}-rtl`]: isRtl,
          [`${prefixCls}-borderless`]: !bordered,
          [`${prefixCls}-in-form-item`]: isFormItemInput,
        },
        getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
        className,
      )}
      {...(restProps as any)}
      placement={getPlacement()}
      dropdownClassName={mergedDropdownClassName}
      dropdownPrefixCls={customizePrefixCls || cascaderPrefixCls}
      transitionName={getTransitionName(
        rootPrefixCls,
        getTransitionDirection(placement),
        transitionName,
      )}
      ref={ref}
    />
  );
}) as unknown as (<OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(
  props: React.PropsWithChildren<CascaderProps<OptionType>> & { ref?: React.Ref<CascaderRef> },
) => React.ReactElement) & {
  displayName: string;
  SHOW_PARENT: typeof SHOW_PARENT;
  SHOW_CHILD: typeof SHOW_CHILD;
};
if (process.env.NODE_ENV !== 'production') {
  Cascader.displayName = 'Cascader';
}
Cascader.SHOW_PARENT = SHOW_PARENT;
Cascader.SHOW_CHILD = SHOW_CHILD;

export { Cascader };
