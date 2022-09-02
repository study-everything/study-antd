import React, { useContext } from 'react';
import classNames from 'classnames';
import RcSelect, { Option, OptGroup } from 'rc-select';
import omit from 'rc-util/lib/omit';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context.js';
import { getTransitionDirection, getTransitionName } from '../_util/motion';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import getIcons from './utils/iconUtil';
import './style/index.less'

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
const InternalSelect = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    className,
    placement,
    listHeight = 256,
    listItemHeight = 24,
    size: customizeSize,
    status: customStatus,
    children,
    disabled: customDisabled,
    showArrow,
  } = props

  const mode = React.useMemo(() => {
    const { mode: m } = props;

    if (m === 'combobox') {
      return undefined;
    }

    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }
    return m;
  }, [props.mode]);

  const isMultiple = mode === 'multiple' || mode === 'tags';
  const mergedShowArrow =
    showArrow !== undefined ? showArrow : props.loading || !(isMultiple || mode === 'combobox');

  // 【问题1】哪里改 getPrefixCls, direction, virtual
  const {
    getPrefixCls,
    direction,
    virtual,
  } = React.useContext(ConfigContext);

  const size = React.useContext(SizeContext);

  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();



  const mergedSize = customizeSize || size;

  const {dropdownClassName} = props
  

  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon,
  } = useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    multiple: isMultiple,
    hasFeedback,
    feedbackIcon,
    showArrow: mergedShowArrow,
    prefixCls,
  });

  const selectProps = omit(props, ['suffixIcon', 'itemIcon']);

  const rcSelectRtlDropdownClassName = classNames(dropdownClassName, {
    [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
  });

  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled || disabled;
  
  const mergedClassName = classNames(
    {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-in-form-item`]: isFormItemInput,
    },
    getStatusClassNames(prefixCls, mergedStatus, hasFeedback), // 拼接形如 ant-status-success 的类
    className,
  );

  const getPlacement = () => {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  };

  return (
    <RcSelect
      ref={ref}
      virtual={virtual}
      dropdownClassName={rcSelectRtlDropdownClassName}
      {...selectProps}
      transitionName={getTransitionName(
        rootPrefixCls,
        getTransitionDirection(placement),
        props.transitionName,
      )}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      mode={mode}
      prefixCls={prefixCls}
      placement={getPlacement()}
      direction={direction}
      inputIcon={suffixIcon}
      menuItemSelectedIcon={itemIcon}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      className={mergedClassName}
      showArrow={hasFeedback || showArrow}
      disabled={mergedDisabled}
    >
      {children}
    </RcSelect>
  )
}

const Select = React.forwardRef(InternalSelect);
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;

export default Select;