import * as React from 'react';
import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import { supportRef, composeRef } from 'rc-util/lib/ref';
import raf from './raf';
import { cloneElement } from './reactNode';

function getGlobalPrefixCls() {
	return 'ant';
}

const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
	if (customizePrefixCls) {
		return customizePrefixCls;
	}
	return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
};

let styleForPseudo: HTMLStyleElement | null;

// Where el is the DOM element you'd like to test for visibility
function isHidden(element: HTMLElement) {
	if (process.env.NODE_ENV === 'test') {
		return false;
	}
	return !element || element.offsetParent === null || element.hidden;
}

function isNotGrey(color: string) {
	// eslint-disable-next-line no-useless-escape
	const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
	if (match && match[1] && match[2] && match[3]) {
		return !(match[1] === match[2] && match[2] === match[3]);
	}
	return true;
}

export interface WaveProps {
	insertExtraNode?: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
}

export default class Wave extends React.Component<WaveProps> {
	private instance?: {
		cancel: () => void;
	};

	private containerRef = React.createRef<HTMLDivElement>();

	private extraNode: HTMLDivElement;

	private clickWaveTimeoutId: number;

	private animationStartId: number;

	private animationStart: boolean = false;

	private destroyed: boolean = false;

	componentDidMount() {
		const node = this.containerRef.current as HTMLDivElement;
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

	onClick = (node: HTMLElement, waveColor: string) => {
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

	onTransitionStart = (e: AnimationEvent) => {
		if (this.destroyed) {
			return;
		}

		const node = this.containerRef.current as HTMLDivElement;
		if (!e || e.target !== node || this.animationStart) {
			return;
		}
		this.resetEffect(node);
	};

	onTransitionEnd = (e: AnimationEvent) => {
		if (!e || e.animationName !== 'fadeEffect') {
			return;
		}
		this.resetEffect(e.target as HTMLElement);
	};

	getAttributeName() {
		const { insertExtraNode } = this.props;
		return insertExtraNode
			? `${getPrefixCls('')}-click-animating`
			: `${getPrefixCls('')}-click-animating-without-extra-node`;
	}

	bindAnimationEvent = (node: HTMLElement) => {
		if (
			!node ||
			!node.getAttribute ||
			node.getAttribute('disabled') ||
			node.className.indexOf('disabled') >= 0
		) {
			return {
				cancel: () => { },
			};
		}
		const onClick = (e: MouseEvent) => {
			// Fix radio button click twice
			if ((e.target as HTMLElement).tagName === 'INPUT' || isHidden(e.target as HTMLElement)) {
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

	resetEffect(node: HTMLElement) {
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

	renderWave = () => {
		const { children } = this.props;
		if (!React.isValidElement(children)) return children;

		let ref: React.Ref<any> = this.containerRef;
		if (supportRef(children)) {
			ref = composeRef((children as any).ref, this.containerRef as any);
		}

		return cloneElement(children, { ref });
	};

	render() {
		return this.renderWave();
	}
}
