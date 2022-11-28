import * as React from 'react';
import Portal from "@rc-component/portal"
import DrawerPopup from './DrawerPopup';

import type { PortalProps } from '@rc-component/portal';
import type { DrawerPopupProps } from './DrawerPopup';

export type Placement = 'left' | 'top' | 'right' | 'bottom';
export interface RcDrawerProps extends Omit<DrawerPopupProps, 'prefixCls' | 'inline'> {
  prefixCls?: string;
  open?: boolean;
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  destroyOnClose?: boolean;
  getContainer?: PortalProps['getContainer'];
}

const RcDrawer: React.FC<RcDrawerProps> = (props) => {
  const {
    open,
    getContainer,
    forceRender,
    prefixCls,
    afterOpenChange,
    destroyOnClose,
    mask,
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const afterOpenChangeFn: RcDrawerProps['afterOpenChange'] = open => {
    setIsOpen(open);
    afterOpenChange?.(open);
  }
  if (!forceRender && !isOpen && !open && destroyOnClose) {
    return null;
  }
  const sharedDrawerProps = {
    ...props,
    prefixCls,
    afterOpenChange: afterOpenChangeFn,
  };
  return (
    <Portal
      open={open || forceRender || isOpen}
      autoDestroy={false}
      getContainer={getContainer}
      autoLock={mask && (open || isOpen)}
    >
      <DrawerPopup {...sharedDrawerProps} inline={getContainer === false} />
    </Portal>
  )
}
RcDrawer.defaultProps = {
  open: false,
  prefixCls: 'rc-drawer',
  placement: 'right',
  autoFocus: true,
  keyboard: true,
  width: 378,
  mask: true,
  maskClosable: true,
};

export default RcDrawer;