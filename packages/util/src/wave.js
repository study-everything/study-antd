import * as React from 'react';
import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import { supportRef, composeRef } from 'rc-util/lib/ref';
import raf from './raf';
import { cloneElement } from './reactNode';
function getGlobalPrefixCls() {
  return 'ant';
}
const getPrefixCls = (suffixCls, customizePrefixCls) => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
};
let styleForPseudo;
// Where el is the DOM element you'd like to test for visibility
function isHidden(element) {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  return !element || element.offsetParent === null || element.hidden;
}
function isNotGrey(color) {
  // eslint-disable-next-line no-useless-escape
  const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
  if (match && match[1] && match[2] && match[3]) {
    return !(match[1] === match[2] && match[2] === match[3]);
  }
  return true;
}
export default class Wave extends React.Component {
  constructor() {
    super(...arguments);
    this.containerRef = React.createRef();
    this.animationStart = false;
    this.destroyed = false;
    this.onClick = (node, waveColor) => {
      var _a, _b;
      const { insertExtraNode, disabled } = this.props;
      if (disabled || !node || isHidden(node) || node.className.indexOf('-leave') >= 0) {
        return;
      }
      this.extraNode = document.createElement('div');
      const { extraNode } = this;
      extraNode.className = `${getPrefixCls('')}-click-animating-node`;
      const attributeName = this.getAttributeName();
      node.setAttribute(attributeName, 'true');
      // Not white or transparent or grey
      if (
        waveColor &&
        waveColor !== '#ffffff' &&
        waveColor !== 'rgb(255, 255, 255)' &&
        isNotGrey(waveColor) &&
        !/rgba\((?:\d*, ){3}0\)/.test(waveColor) && // any transparent rgba color
        waveColor !== 'transparent'
      ) {
        extraNode.style.borderColor = waveColor;
        const nodeRoot =
          ((_a = node.getRootNode) === null || _a === void 0 ? void 0 : _a.call(node)) ||
          node.ownerDocument;
        // @ts-ignore
        const nodeBody =
          nodeRoot instanceof Document
            ? nodeRoot.body
            : (_b = nodeRoot.firstChild) !== null && _b !== void 0
            ? _b
            : nodeRoot;
        styleForPseudo = updateCSS(
          `
      [${getPrefixCls('')}-click-animating-without-extra-node='true']::after, .${getPrefixCls(
            '',
          )}-click-animating-node {
        --antd-wave-shadow-color: ${waveColor};
      }`,
          'antd-wave',
        );
      }
      if (insertExtraNode) {
        node.appendChild(extraNode);
      }
      ['transition', 'animation'].forEach(name => {
        node.addEventListener(`${name}start`, this.onTransitionStart);
        node.addEventListener(`${name}end`, this.onTransitionEnd);
      });
    };
    this.onTransitionStart = e => {
      if (this.destroyed) {
        return;
      }
      const node = this.containerRef.current;
      if (!e || e.target !== node || this.animationStart) {
        return;
      }
      this.resetEffect(node);
    };
    this.onTransitionEnd = e => {
      if (!e || e.animationName !== 'fadeEffect') {
        return;
      }
      this.resetEffect(e.target);
    };
    this.bindAnimationEvent = node => {
      if (
        !node ||
        !node.getAttribute ||
        node.getAttribute('disabled') ||
        node.className.indexOf('disabled') >= 0
      ) {
        return;
      }
      const onClick = e => {
        // Fix radio button click twice
        if (e.target.tagName === 'INPUT' || isHidden(e.target)) {
          return;
        }
        this.resetEffect(node);
        // Get wave color from target
        const waveColor =
          getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
          getComputedStyle(node).getPropertyValue('border-color') ||
          getComputedStyle(node).getPropertyValue('background-color');
        this.clickWaveTimeoutId = window.setTimeout(() => this.onClick(node, waveColor), 0);
        raf.cancel(this.animationStartId);
        this.animationStart = true;
        // Render to trigger transition event cost 3 frames. Let's delay 10 frames to reset this.
        this.animationStartId = raf(() => {
          this.animationStart = false;
        }, 10);
      };
      node.addEventListener('click', onClick, true);
      return {
        cancel: () => {
          node.removeEventListener('click', onClick, true);
        },
      };
    };
    this.renderWave = () => {
      const { children } = this.props;
      if (!React.isValidElement(children)) return children;
      let ref = this.containerRef;
      if (supportRef(children)) {
        ref = composeRef(children.ref, this.containerRef);
      }
      return cloneElement(children, { ref });
    };
  }
  componentDidMount() {
    const node = this.containerRef.current;
    if (!node || node.nodeType !== 1) {
      return;
    }
    this.instance = this.bindAnimationEvent(node);
  }
  componentWillUnmount() {
    if (this.instance) {
      this.instance.cancel();
    }
    if (this.clickWaveTimeoutId) {
      clearTimeout(this.clickWaveTimeoutId);
    }
    this.destroyed = true;
  }
  getAttributeName() {
    const { insertExtraNode } = this.props;
    return insertExtraNode
      ? `${getPrefixCls('')}-click-animating`
      : `${getPrefixCls('')}-click-animating-without-extra-node`;
  }
  resetEffect(node) {
    if (!node || node === this.extraNode || !(node instanceof Element)) {
      return;
    }
    const { insertExtraNode } = this.props;
    const attributeName = this.getAttributeName();
    node.setAttribute(attributeName, 'false'); // edge has bug on `removeAttribute` #14466
    if (styleForPseudo) {
      styleForPseudo.innerHTML = '';
    }
    if (insertExtraNode && this.extraNode && node.contains(this.extraNode)) {
      node.removeChild(this.extraNode);
    }
    ['transition', 'animation'].forEach(name => {
      node.removeEventListener(`${name}start`, this.onTransitionStart);
      node.removeEventListener(`${name}end`, this.onTransitionEnd);
    });
  }
  render() {
    return this.renderWave();
  }
}
