
import React from 'react'
import RightOutlined from '@ant-design/icons/RightOutlined';
import classNames from 'classnames';
import type { CSSMotionProps } from 'rc-motion';
import RcCollapse from 'rc-collapse';
import toArray from 'rc-util/lib/Children/toArray';
import omit from 'rc-util/lib/omit';
import type { CollapsibleType } from './CollapsePanel';
import CollapsePanel from './CollapsePanel';
import { ConfigContext } from './config-provider';
import warning from './_util/warning';
import collapseMotion from './_util/motion';
import { cloneElement } from './_util/reactNode';

type ExpandIconPositionLegacy = 'left' | 'right';
export type ExpandIconPosition = 'start' | 'end' | ExpandIconPositionLegacy | undefined;

export interface CollapseProps {
	activeKey?: Array<string | number> | string | number;
  defaultActiveKey?: Array<string | number> | string | number;
  accordion?: boolean;
  destroyInactivePanel?: boolean;
  onChange?: (key: string | string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  bordered?: boolean;
  prefixCls?: string;
  expandIcon?: (panelProps: PanelProps) => React.ReactNode;
  expandIconPosition?: ExpandIconPosition;
  ghost?: boolean;
  collapsible?: CollapsibleType;
  children?: React.ReactNode;
}

interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  disabled?: boolean;
  extra?: React.ReactNode;
  collapsible?: CollapsibleType;
}

interface CollapseInterface extends React.FC<CollapseProps> {
  Panel: typeof CollapsePanel;
}

const Collapse: CollapseInterface = (props) => {
	const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className = '',
    bordered = true,
    ghost,
    expandIconPosition = 'start',
  } = props;
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);

  // Warning if use legacy type `expandIconPosition`
  warning(
    expandIconPosition !== 'left' && expandIconPosition !== 'right',
    'Collapse',
    '`expandIconPosition` with `left` or `right` is deprecated. Please use `start` or `end` instead.',
  );

  const mergedExpandIconPosition = React.useMemo(() => {
    if (expandIconPosition === 'left') {
      return 'start';
    }
    return expandIconPosition === 'right' ? 'end' : expandIconPosition;
  }, [expandIconPosition]);

  const renderExpandIcon = (panelProps: PanelProps = {}) => {
    const { expandIcon } = props;
    const icon = (
      expandIcon ? (
        expandIcon(panelProps)
      ) : (
        <RightOutlined rotate={panelProps.isActive ? 90 : undefined} />
      )
    ) as React.ReactNode;

    return cloneElement(icon, () => ({
      className: classNames((icon as any).props.className, `${prefixCls}-arrow`),
    }));
  };

  const collapseClassName = classNames(
    `${prefixCls}-icon-position-${mergedExpandIconPosition}`,
    {
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-ghost`]: !!ghost,
    },
    className,
  );
  const openMotion: CSSMotionProps = {
    ...collapseMotion,
    motionAppear: false,
    leavedClassName: `${prefixCls}-content-hidden`,
  };

  const getItems = () => {
    const { children } = props;
    return toArray(children).map((child: React.ReactElement, index: number) => {
      if (child.props?.disabled) {
        const key = child.key || String(index);
        const { disabled, collapsible } = child.props;
        const childProps: CollapseProps & { key: React.Key } = {
          ...omit(child.props, ['disabled']),
          key,
          collapsible: collapsible ?? (disabled ? 'disabled' : undefined),
        };
        return cloneElement(child, childProps);
      }
      return child;
    });
  };

  return (
    <RcCollapse
      openMotion={openMotion}
      {...props}
      expandIcon={renderExpandIcon}
      prefixCls={prefixCls}
      className={collapseClassName}
    >
      {getItems()}
    </RcCollapse>
  );
	// return <div>Collapse</div>
}

Collapse.Panel = CollapsePanel;

export {Collapse};
