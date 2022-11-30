
import React, { useEffect } from 'react'
import classNames from 'classnames';

export interface ToolTipProps {
	children: React.ReactNode;
	placement: 'top' | 'left' | 'bottom' | 'right',
	conent: string,
	fontStylecolor?:string,
	bgStylecolor?: string,
}

export const ToolTip: React.FC<ToolTipProps> = (props) => {
  const parentDom = React.useRef<HTMLDivElement>();
  const floatDom = React.useRef<HTMLDivElement>();
	const { children, placement,conent, bgStylecolor, fontStylecolor } = props
	const [isShow,setIsShow] = React.useState(false);
	const [isClass,setIsClass] = React.useState('');
	const mouseEnter = ()=>{
		setIsShow(true)
	}
	const cls = classNames('x','layout');
	const mouseLeave = ()=>{
		setIsShow(false)
	}
	const bottomHandleFn = (childDom: HTMLDivElement,width:number, height: number,  childHeight:number,childWidth:number)  => {
		// bottom
		childDom.style.bottom = `-${childHeight + 20}px`;
		childDom.style.right = `${(width - childWidth)/2}px`;
	}
	const leftHandleFn = (childDom: HTMLDivElement,width:number, height: number,  childHeight:number,childWidth:number)  => {
		// left
		childDom.style.top = `0px`;
		childDom.style.right = `-${childWidth + 20}px`;
	}
	const rightHandleFn = (childDom: HTMLDivElement,width:number, height: number,  childHeight:number,childWidth:number)  => {
		// right
		childDom.style.top = `0px`;
		childDom.style.left = `-${childWidth + 20}px`;
	}
	const topHandleFn = (childDom: HTMLDivElement,width:number, height: number,  childHeight:number,childWidth:number) => {
		// top
		childDom.style.top = `-${childHeight + 20}px`;
		childDom.style.right = `${(width - childWidth)/2}px`;
	}
	useEffect(()=>{
		const dom = parentDom.current;
		const childDom = floatDom.current;
		const {height, width} = dom.getBoundingClientRect();
		const {height:childHeight, width:childWidth} = childDom.getBoundingClientRect();
		
		if(bgStylecolor){
			childDom.style.borderColor = bgStylecolor
			childDom.style.backgroundColor = bgStylecolor
		}
		if(fontStylecolor){
			childDom.style.color = fontStylecolor
		}
		if(!isShow){
			childDom.style.opacity = '0'
		} else {
			childDom.style.opacity = '1'
		}
		switch(placement){
			case 'bottom':
				setIsClass('bottom');
				bottomHandleFn(childDom,width,height,childHeight,childWidth);
				break;
			case 'right':
				setIsClass('right');
				rightHandleFn(childDom,width,height,childHeight,childWidth);
				break;
			case 'top':
				setIsClass('top');
				topHandleFn(childDom,width,height,childHeight,childWidth);
				break;
			case 'left':
				setIsClass('left');
				leftHandleFn(childDom,width,height,childHeight,childWidth);
				break;
			default:
				return;
		}
	})
	// TODO
	return <div
		className={ isShow ? cls : 'layout'}
		onMouseEnter={mouseEnter}
		onMouseLeave={mouseLeave}
		ref={parentDom}
	>
    <div
			className={isClass}
			ref={floatDom}
		>
			{conent}
		</div>
		{children}
	</div>
}