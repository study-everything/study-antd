import * as React from 'react';
import Tooltip, { type AbstractTooltipProps } from 'antd/lib/tooltip';
import { ConfigContext } from 'antd/lib/config-provider';
import type { RenderFunction } from 'antd//lib/_util/getRenderPropValue';
import { getRenderPropValue } from 'antd//lib/_util/getRenderPropValue';
import { getTransitionName } from 'antd//lib/_util//motion';

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  content?: React.ReactNode | RenderFunction;
}

interface OverlayPorps {
  prefixCls?: string;
  title?: PopoverProps['title'];
  content?: PopoverProps['content'];
}

const Overlay: React.FC<OverlayPorps> = ({ title, content, prefixCls }) => {
  if (!title && !content) {
    return null;
  }
  return (
    <>
      {title && <div className={`${prefixCls}-title`}>{getRenderPropValue(title)}</div>}
      <div className={`${prefixCls}-inner-content`}>{getRenderPropValue(content)}</div>
    </>
  );
};

const Popover = React.forwardRef<unknown, PopoverProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    content,
    overlayClassName,
    placement = 'top',
    trigger = 'hover',
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    overlayStyle = {},
    ...otherProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  return (
    <Tooltip
      placement={placement}
      trigger={trigger}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      overlayStyle={overlayStyle}
      {...otherProps}
      prefixCls={prefixCls}
      overlayClassName={overlayClassName}
      ref={ref}
      overlay={<Overlay prefixCls={prefixCls} title={title} content={content} />}
      transitionName={getTransitionName(rootPrefixCls, 'zoom-big', otherProps.transitionName)}
      data-popover-inject
    />
  );
});

export default Popover;
