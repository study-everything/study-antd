import classNames from 'classnames';
import React, { useLayoutEffect, useRef, useState } from 'react';
import CSSMotion from 'rc-motion';
import type { CSSMotionProps } from 'rc-motion';
import Align from 'rc-align'
import type { RefAlign } from 'rc-align/es/Align';
import { getMotion } from '../utils/legacyUtil';
import type { AlignType, AnimationType, Point, StretchType, TransitionNameType } from '../interface';
import useStretchStyle from './useStretchStyle';
import useVisibleStatus from './useVisibleStatus';


export interface PopupInnerProps {
  visible?: boolean;

  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  zIndex?: number;

  // Motion
  motion: CSSMotionProps;
  destroyPopupOnHide?: boolean;
  forceRender?: boolean;

  // Legacy Motion
  animation: AnimationType;
  transitionName: TransitionNameType;

  // Measure
  stretch?: StretchType;

  // Align
  align?: AlignType;
  point?: Point;
  getRootDomNode?: () => HTMLElement;
  getClassNameFromAlign?: (align: AlignType) => string;
  onAlign?: (element: HTMLElement, align: AlignType) => void;

  // Events
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface PopupInnerRef {
  forceAlign: () => void;
  getElement: () => HTMLElement;
}

const PopupInner = React.forwardRef<PopupInnerRef, PopupInnerProps>(
  (props, ref) => {
    const {
      visible,

      prefixCls,
      className,
      style,
      children,
      zIndex,

      stretch,
      destroyPopupOnHide,
      forceRender,

      align,
      point,
      getRootDomNode,
      getClassNameFromAlign,
      onAlign,

      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onTouchStart,
      onClick,
    } = props;

    const elementRef = useRef<HTMLDivElement>();

    const alignRef = useRef<RefAlign>();

    const prepareResolveRef = useRef<(value?: unknown) => void>();

    const [alignedClassName, setAlignedClassName] = useState<string>();
    const [alignTimes, setAlignTimes] = useState(0);

    const [stretchStyle, measureStretchStyle] = useStretchStyle(stretch);
    function doMeasure() {
      if (stretch) {
        measureStretchStyle(getRootDomNode());
      }
    }

    // ======================== Status ========================
    const [status, goNextStatus] = useVisibleStatus(visible, doMeasure);

    useLayoutEffect(() => {
      if (status === 'alignPre') {
        setAlignTimes(0);
      }
    }, [status]);


    function forceAlign() {
      alignRef.current?.forceAlign();
    }

    // Delay to go to next status
    useLayoutEffect(() => {
      if (status === 'align') {
        // Repeat until not more align needed
        if (alignTimes < 2) {
          forceAlign();
        } else {
          goNextStatus(() => {
            prepareResolveRef.current?.();
          });
        }
      }
    }, [alignTimes]);

    function onInternalAlign(popupDomNode: HTMLElement, matchAlign: AlignType) {
      const nextAlignedClassName = getClassNameFromAlign(matchAlign);

      if (alignedClassName !== nextAlignedClassName) {
        setAlignedClassName(nextAlignedClassName);
      }

      // We will retry multi times to make sure that the element has been align in the right position.
      setAlignTimes((val) => val + 1);

      if (status === 'align') {
        onAlign?.(popupDomNode, matchAlign);
      }
    }

    // ========================= Refs =========================
    React.useImperativeHandle(ref, () => ({
      forceAlign,
      getElement: () => elementRef.current,
    }));

    // ======================== Motion ========================
    const motion = { ...getMotion(props) };

    function onShowPrepare() {
      return new Promise((resolve) => {
        prepareResolveRef.current = resolve;
      });
    }

    // `target` on `rc-align` can accept as a function to get the bind element or a point.
    // ref: https://www.npmjs.com/package/rc-align
    function getAlignTarget() {
      if (point) {
        return point;
      }
      return getRootDomNode;
    }

    // Align status
    let alignDisabled = true;
    if (align?.points && (status === 'align' || status === 'stable')) {
      alignDisabled = false;
    }

    // ======================== Render ========================
    const mergedStyle: React.CSSProperties = {
      ...stretchStyle,
      zIndex,
      opacity:
        status === 'motion' || status === 'stable' || !visible ? undefined : 0,
      // Cannot interact with disappearing elements
      // https://github.com/ant-design/ant-design/issues/35051#issuecomment-1101340714
      pointerEvents: !visible && status !== 'stable' ? 'none' : undefined,
      ...style,
    };

    let childNode = children;

    // Wrapper when multiple children
    if (React.Children.count(children) > 1) {
      childNode = <div className={`${prefixCls}-content`}>{children}</div>;
    }

    return (
      <CSSMotion
        visible={visible}
        ref={elementRef}
        leavedClassName={`${prefixCls}-hidden`}
        {...motion}
        onAppearPrepare={onShowPrepare}
        onEnterPrepare={onShowPrepare}
        removeOnLeave={destroyPopupOnHide}
        forceRender={forceRender}
      >
        {({ className: motionClassName, style: motionStyle }, motionRef) => {
          const mergedClassName = classNames(
            prefixCls,
            className,
            alignedClassName,
            motionClassName,
          );

          return (
            <Align
              // @ts-ignore
              target={getAlignTarget()}
              key="popup"
              ref={alignRef}
              monitorWindowResize
              disabled={alignDisabled}
              align={align}
              onAlign={onInternalAlign}
            >
              <div
                ref={motionRef}
                className={mergedClassName}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseDownCapture={onMouseDown}
                onTouchStartCapture={onTouchStart}
                onClick={onClick}
                style={{
                  ...motionStyle,
                  ...mergedStyle,
                }}
              >
                {childNode}
              </div>
            </Align>
          );
        }}
      </CSSMotion>
    );
  }
);

PopupInner.displayName = 'PopupInner';

export default PopupInner;
