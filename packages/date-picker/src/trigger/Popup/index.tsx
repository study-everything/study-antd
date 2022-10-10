import React, { useEffect, useState } from "react";
import type { CSSMotionProps } from "rc-motion";
import type { PopupInnerRef } from './PopupInner';
import PopupInner from "./PopupInner";
import Mask from "./Mask";
import type { AlignType } from "../../align/interface";
import type { AnimationType, MobileConfig, Point, StretchType, TransitionNameType } from "../interface";

export interface PopupProps {
  visible?: boolean;
  style?: React.CSSProperties;
  getClassNameFromAlign?: (align: AlignType) => string;
  onAlign?: (element: HTMLElement, align: AlignType) => void;
  getRootDomNode?: () => HTMLElement;
  align?: AlignType;
  destroyPopupOnHide?: boolean;
  className?: string;
  prefixCls: string;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onMouseDown?: React.MouseEventHandler<HTMLElement>;
  onTouchStart?: React.TouchEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  stretch?: StretchType;
  children?: React.ReactNode;
  point?: Point;
  zIndex?: number;
  mask?: boolean;

  // Motion
  motion: CSSMotionProps;
  maskMotion: CSSMotionProps;
  forceRender?: boolean;

  // Legacy
  animation: AnimationType;
  transitionName: TransitionNameType;
  maskAnimation: AnimationType;
  maskTransitionName: TransitionNameType;

  // Mobile
  mobile?: MobileConfig;
}

const Popup = React.forwardRef<PopupInnerRef, PopupProps>(
  ({ visible, ...props }, ref) => {
    const [innerVisible, serInnerVisible] = useState(visible);
    const cloneProps = { ...props, visible: innerVisible };


    useEffect(() => {
      serInnerVisible(visible);
    }, [visible]);

    const popupNode: React.ReactNode = (<PopupInner {...cloneProps} ref={ref} />)

    return (
      <div>
        <Mask {...cloneProps} />
        {popupNode}
      </div>
    );
  }
)

Popup.displayName = 'Popup';

export default Popup;
