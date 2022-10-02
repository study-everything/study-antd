import classNames from 'classnames';
import * as React from 'react';
import Trigger from '../trigger';
import type { AlignType } from '../trigger/interface';

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
};

export type PickerTriggerProps = {
  prefixCls: string;
  visible: boolean;
  popupElement: React.ReactElement;
  children: React.ReactElement;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  dropdownAlign?: AlignType;
  dropdownClassName?: string;
  direction?: 'ltr' | 'rtl';
}

function PickerTrigger({
  prefixCls,
  popupElement,
  visible,
  dropdownAlign,
  getPopupContainer,
  children,
  direction,
  dropdownClassName,
}: PickerTriggerProps) {
  const dropdownPrefixCls = `${prefixCls}-dropdown`;

  return (
    <Trigger
      popupPlacement="bottomLeft"
      builtinPlacements={BUILT_IN_PLACEMENTS}
      prefixCls={dropdownPrefixCls}
      popup={popupElement}
      popupAlign={dropdownAlign}
      popupVisible={visible}
      getPopupContainer={getPopupContainer}
      popupClassName={classNames(dropdownClassName, {
        [`${dropdownPrefixCls}-rtl`]: direction === 'rtl',
      })}
    >
      {children}
    </Trigger>
  )
}

export default PickerTrigger;
