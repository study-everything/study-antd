import classNames from "classnames";
import Portal from "rc-util/lib/Portal";
import { composeRef, supportRef } from "rc-util/lib/ref";
import React from 'react';
import type { HTMLAttributes } from 'react';
import ReactDOM from "react-dom";
import raf from 'rc-util/lib/raf';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import type { CSSMotionProps } from "rc-motion";
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import contains from "rc-util/lib/Dom/contains";
import Popup from "./Popup";
import { getAlignFromPlacement, getAlignPopupClassName } from "./utils/alignUtil";
import TriggerContext from "./context";
import type { PopupInnerRef } from './Popup/PopupInner';
import type { ActionType, AlignType, AnimationType, BuildInPlacements, CommonEventHandler, MobileConfig, TransitionNameType } from "./interface";


function noop() { }

function returnEmptyString() {
  return '';
}

export interface TriggerProps {
  children: React.ReactElement;
  action?: ActionType | ActionType[];
  getPopupClassNameFromAlign?: (align: AlignType) => string;
  onPopupVisibleChange?: (visible: boolean) => void;
  onPopupClick?: React.MouseEventHandler<HTMLDivElement>;
  afterPopupVisibleChange?: (visible: boolean) => void;
  popup: React.ReactNode | (() => React.ReactNode);
  popupStyle?: React.CSSProperties;
  prefixCls?: string;
  popupClassName?: string;
  className?: string;
  popupPlacement?: string;
  builtinPlacements?: BuildInPlacements;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  zIndex?: number;
  focusDelay?: number;
  blurDelay?: number;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  getDocument?: (element?: HTMLElement) => HTMLDocument;
  forceRender?: boolean;
  destroyPopupOnHide?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  onPopupAlign?: (element: HTMLElement, align: AlignType) => void;
  popupAlign?: AlignType;
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  autoDestroy?: boolean;

  stretch?: string;
  alignPoint?: boolean; // Maybe we can support user pass position in the future

  /** Set popup motion. You can ref `rc-motion` for more info. */
  popupMotion?: CSSMotionProps;
  /** Set mask motion. You can ref `rc-motion` for more info. */
  maskMotion?: CSSMotionProps;

  /** @deprecated Please us `popupMotion` instead. */
  popupTransitionName?: TransitionNameType;
  /** @deprecated Please us `popupMotion` instead. */
  popupAnimation?: AnimationType;
  /** @deprecated Please us `maskMotion` instead. */
  maskTransitionName?: TransitionNameType;
  /** @deprecated Please us `maskMotion` instead. */
  maskAnimation?: string;

  /**
   * @private Get trigger DOM node.
   * Used for some component is function component which can not access by `findDOMNode`
   */
  getTriggerDOMNode?: (node: React.ReactInstance) => HTMLElement;

  // ========================== Mobile ==========================
  /** @private Bump fixed position at bottom in mobile.
   * This is internal usage currently, do not use in your prod */
  mobile?: MobileConfig;
}

interface TriggerState {
  prevPopupVisible: boolean;
  popupVisible: boolean;
  // point?: Point;
}

function returnDocument(element?: HTMLElement) {
  if (element) {
    return element.ownerDocument; // ownerDocument 返回当前元素所属的文档 👍
  }
  return window.document;
}

export function generateTrigger(PortalComponent: any): React.ComponentClass<TriggerProps> {
  class Trigger extends React.Component<TriggerProps, TriggerState> {

    static contextType = TriggerContext;

    preClickTime: number;

    preTouchTime: number;

    delayTimer: number;

    // ensure `getContainer` will be called only once
    portalContainer?: HTMLElement;

    static defaultProps = {
      prefixCls: 'rc-trigger-popup',
      getPopupClassNameFromAlign: returnEmptyString,
      getDocument: returnDocument,
      onPopupVisibleChange: noop,
      afterPopupVisibleChange: noop,
      onPopupAlign: noop,
      popupClassName: '',
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0.1,
      focusDelay: 0,
      blurDelay: 0.15,
      popupStyle: {},
      destroyPopupOnHide: false,
      popupAlign: {},
      defaultPopupVisible: false,
      mask: false,
      maskClosable: true,
      action: [],
      autoDestroy: false,
    };

    popupRef = React.createRef<PopupInnerRef>();

    triggerRef = React.createRef<React.ReactInstance>();

    hasPopupMouseDown: boolean;

    mouseDownTimeout: number;

    attachId?: number;

    clickOutsideHandler: CommonEventHandler;

    constructor(props: TriggerProps) {
      super(props)

      const popupVisible = 'popupVisible' in props ? !!props.popupVisible : !!props.defaultPopupVisible;

      this.state = {
        // eslint-disable-next-line react/no-unused-state
        prevPopupVisible: popupVisible,
        popupVisible,
      }
    }

    isClickToShow() {
      const { action } = this.props;
      return action.indexOf('click') !== -1;
    }

    isClickToHide() {
      const { action } = this.props;
      return action.indexOf('click') !== -1;
    }

    /**
     * 其实就是同时触发 children 上的 event 和 props 中的 event
     */
    fireEvents(type: string, e: Event) {
      const childCallback = this.props.children.props[type];

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      childCallback && childCallback(e)

      const callback = this.props[type]

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      callback && callback(e)
    }

    clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    }

    setPopupVisible(popupVisible: boolean) {
      const { popupVisible: prevPopupVisible } = this.state;

      this.clearDelayTimer();

      if (prevPopupVisible !== popupVisible) {
        if (!('popupVisible' in this.props)) {
          this.setState({
            popupVisible,
            // eslint-disable-next-line react/no-unused-state
            prevPopupVisible,
          });
        }
        this.props.onPopupVisibleChange(popupVisible);
      }
    }

    onClick = (event) => {
      this.fireEvents('onClick', event)

      this.preClickTime = 0;
      this.preTouchTime = 0;

      const nextVisible = !this.state.popupVisible;

      if (
        (this.isClickToHide() && !nextVisible) ||
        (nextVisible && this.isClickToShow())
      ) {
        this.setPopupVisible(!this.state.popupVisible);
      }

    }

    /**
     *
     * @returns 返回 trigger 对应的 dom 节点
     */
    getRootDomNode = (): HTMLElement => {
      try {
        const domNode = findDOMNode<HTMLElement>(this.triggerRef.current);
        if (domNode) return domNode;
      } catch (err) {
        // Do nothing
      }

      return ReactDOM.findDOMNode(this) as HTMLElement
    }

    static getDerivedStateFromProps(
      { popupVisible }: TriggerProps,
      prevState: TriggerState,
    ) {
      const newState: Partial<TriggerState> = {};

      if (
        popupVisible !== undefined &&
        prevState.popupVisible !== popupVisible
      ) {
        newState.popupVisible = popupVisible;
        newState.prevPopupVisible = prevState.popupVisible;
      }

      return newState;
    }

    getPopupDomNode() {
      // for test
      return this.popupRef.current?.getElement() || null;
    }

    close() {
      this.setPopupVisible(false);
    }

    onDocumentClick = (event) => {
      if (this.props.mask && !this.props.maskClosable) {
        return;
      }

      const { target } = event;
      const root = this.getRootDomNode();
      const popupNode = this.getPopupDomNode();

      if (
        !contains(root, target) && !contains(popupNode, target) && !this.hasPopupMouseDown
      ) {
        this.close();
      }
    }

    componentDidMount() {
      this.componentDidUpdate();
    }

    clearOutsideHandler() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }
    }

    componentDidUpdate() {
      const { props, state } = this;

      if (state.popupVisible) {
        let currentDocument;
        if (!this.clickOutsideHandler && this.isClickToHide()) {
          currentDocument = props.getDocument(this.getRootDomNode());

          this.clickOutsideHandler = addEventListener(
            currentDocument,
            'mousedown',
            this.onDocumentClick
          )
        }

        return;
      }

      this.clearOutsideHandler();
    }

    /**
     * 获取 popup 挂载的节点, 并且将该 popupContainer 挂载到 body 上或者用户指定的 container 上
     * @returns
     */
    getContainer = () => {
      if (!this.portalContainer) {
        // In React.StrictMode component will call render multiple time in first mount.
        // When you want to refactor with FC, useRef will also init multiple time and
        // point to different useRef instance which will create multiple element
        // (This multiple render will not trigger effect so you can not clean up this
        // in effect). But this is safe with class component since it always point to same class instance.
        const { getDocument } = this.props;
        const popupContainer = getDocument(this.getRootDomNode()).createElement('div');

        popupContainer.style.position = 'absolute';
        popupContainer.style.top = '0';
        popupContainer.style.left = '0';
        popupContainer.style.width = '100%';

        this.portalContainer = popupContainer;
      }

      this.attachParent(this.portalContainer);
      return this.portalContainer;
    }

    attachParent = (popupContainer: HTMLElement) => {
      raf.cancel(this.attachId)

      const { getPopupContainer, getDocument } = this.props;
      const domNode = this.getRootDomNode();

      let mountNode: HTMLElement;
      if (!getPopupContainer) {
        mountNode = getDocument(this.getRootDomNode()).body;
      } else if (domNode || getPopupContainer.length === 0) {
        // Compatible for legacy getPopupContainer with domNode argument.
        // If no need `domNode` argument, will call directly.
        // https://codesandbox.io/s/eloquent-mclean-ss93m?file=/src/App.js
        mountNode = getPopupContainer(domNode);
      }

      if (mountNode) {
        mountNode.appendChild(popupContainer);
      } else {
        // Retry after frame render in case parent not ready
        this.attachId = raf(() => {
          this.attachParent(popupContainer);
        });
      }
    }

    onPopupMouseDown = (...args) => {
      this.hasPopupMouseDown = true;

      clearTimeout(this.mouseDownTimeout)
      this.mouseDownTimeout = window.setTimeout(() => {
        this.hasPopupMouseDown = false
      }, 0)

      if (this.context) {
        // @ts-ignore
        this.context.onPopupMouseDown(...args);
      }

    };

    triggerContextValue = { onPopupMouseDown: this.onPopupMouseDown }

    getPopupAlign() {
      const { props } = this;
      const { popupPlacement, popupAlign, builtinPlacements } = props;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(
          builtinPlacements,
          popupPlacement,
          popupAlign,
        );
      }
      return popupAlign;
    }

    getPopupClassNameFromAlign = (align) => {
      const className = [];
      const {
        popupPlacement,
        builtinPlacements,
        prefixCls,
        alignPoint,
        getPopupClassNameFromAlign,
      } = this.props;
      if (popupPlacement && builtinPlacements) {
        className.push(
          getAlignPopupClassName(
            builtinPlacements,
            prefixCls,
            align,
            alignPoint,
          ),
        );
      }
      if (getPopupClassNameFromAlign) {
        className.push(getPopupClassNameFromAlign(align));
      }
      return className.join(' ');
    };

    getComponent = () => {
      const {
        prefixCls,
        destroyPopupOnHide,
        popupClassName,
        onPopupAlign,
        popupMotion,
        popupAnimation,
        popupTransitionName,
        popupStyle,
        mask,
        maskAnimation,
        maskTransitionName,
        maskMotion,
        zIndex,
        popup,
        stretch,
        mobile,
        forceRender,
        onPopupClick,
      } = this.props;

      const { popupVisible } = this.state;

      const align = this.getPopupAlign();

      const mouseProps: HTMLAttributes<HTMLElement> = {};
      mouseProps.onMouseDown = this.onPopupMouseDown;
      mouseProps.onTouchStart = this.onPopupMouseDown;


      return (
        <Popup
          prefixCls={prefixCls}
          destroyPopupOnHide={destroyPopupOnHide}
          visible={popupVisible}
          className={popupClassName}
          align={align}
          onAlign={onPopupAlign}
          animation={popupAnimation}
          getClassNameFromAlign={this.getPopupClassNameFromAlign}
          {...mouseProps}
          stretch={stretch}
          getRootDomNode={this.getRootDomNode}
          style={popupStyle}
          mask={mask}
          zIndex={zIndex}
          transitionName={popupTransitionName}
          maskAnimation={maskAnimation}
          maskTransitionName={maskTransitionName}
          maskMotion={maskMotion}
          ref={this.popupRef}
          motion={popupMotion}
          mobile={mobile}
          forceRender={forceRender}
          onClick={onPopupClick}
        >
          {typeof popup === 'function' ? popup() : popup}
        </Popup>
      );
    }

    render() {
      const { popupVisible } = this.state;

      const { children, className } = this.props;

      const child = React.Children.only(children) as React.ReactElement;
      const newChildProps: HTMLAttributes<HTMLElement> & { key: string } = {
        key: 'trigger'
      }

      if (this.isClickToHide()) {
        newChildProps.onClick = this.onClick;
      }

      const childrenClassName = classNames(
        child && child.props && child.props.className,
        className,
      );
      if (childrenClassName) {
        newChildProps.className = childrenClassName;
      }

      const cloneProps: any = {
        ...newChildProps,
      };
      if (supportRef(child)) {
        cloneProps.ref = composeRef(this.triggerRef, (child as any).ref);
      }
      const trigger = React.cloneElement(child, cloneProps);
      let portal: React.ReactElement;
      if (popupVisible || this.popupRef.current) {
        portal = (
          <PortalComponent
            key="portal"
            getContainer={this.getContainer}
            didUpdate={() => { }}
          >
            {this.getComponent()}
          </PortalComponent>
        );
      }

      return (
        <TriggerContext.Provider value={this.triggerContextValue}>
          {trigger}
          {portal}
        </TriggerContext.Provider>
      );
    }
  }

  return Trigger;
}

export default generateTrigger(Portal);
