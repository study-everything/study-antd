import type { ButtonHTMLType, ButtonProps } from 'antd/es/button/button';
import type { ButtonGroupProps } from 'antd/es/button/button-group';

export const tuple = <T extends string[]>(...args: T) => args;

const Placements = tuple(
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
  'top',
  'bottom',
);

export type Placement = typeof Placements[number];

type OverlayFunc = () => React.ReactElement;

type Align = {
  points?: [string, string];
  offset?: [number, number];
  targetOffset?: [number, number];
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
};

export type DropdownArrowOptions = {
  pointAtCenter?: boolean;
};

export interface DropdownProps {
  autoFocus?: boolean;
  arrow?: boolean | DropdownArrowOptions;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactElement | OverlayFunc;
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
  disabled?: boolean;
  destroyPopupOnHide?: boolean;
  align?: Align;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  className?: string;
  transitionName?: string;
  placement?: Placement;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  forceRender?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  openClassName?: string;
  children?: React.ReactNode;
}

export interface DropdownInterface extends React.FC<DropdownProps> {
  Button: any;
}


export type DropdownButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';

export interface DropdownButtonProps extends ButtonGroupProps, DropdownProps {
  type?: DropdownButtonType;
  htmlType?: ButtonHTMLType;
  disabled?: boolean;
  loading?: ButtonProps['loading'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  title?: string;
  buttonsRender?: (buttons: React.ReactNode[]) => React.ReactNode[];
}