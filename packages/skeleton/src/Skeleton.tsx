
import React from 'react'
import classNames from 'classnames'
import Element from './Element'
import Title from './Title'
import { SkeletonParagraphProps } from './Paragraph';
import Paragraph from './Paragraph';
import SkeletonAvatar from './Avatar';
import SkeletonButton from './Button';
import SkeletonInput from './Input';
import SkeletonImage from './Image';

export interface SkeletonProps {
	active?:boolean;
	loading?:boolean;
	prefixCls?:string;
	className?:string;
	style?:React.CSSProperties;
	children?:React.ReactNode;
	avatar?: any | boolean;
  title?: any | boolean;
  paragraph?: any | boolean;
  round?: boolean;
}

function getComponentProps(prop:boolean|undefined) {
	if (prop && typeof prop === 'object') {
		return prop;
	}
	return {}
}

function getAvatarBasicProps(hasTitle:boolean,hasParagraph:boolean):any {
	if (hasTitle && !hasParagraph) {
		// 圆角avatar
		return {size:'large',shape:'square'}
	}
	return {size:'large',shape:'circle'}
}

function getTitleBasicProps(hasAvatar:boolean,hasParagraph:boolean) {
	if (!hasAvatar && hasParagraph) {
		return {width:'38%'}
	}
	if (hasAvatar && hasParagraph) {
		return {width:'50%'}
	}
	return {}
}

// paragraph 段落
function getParagraphBasicProps(hasAvatar:boolean,hasTitle:boolean):SkeletonParagraphProps {
	const basicProps:SkeletonParagraphProps = {};
	if (!hasAvatar || !hasTitle) {
		basicProps.width = '61%'
	}
	if (!hasAvatar && hasTitle) {
		basicProps.rows = 3
	}else{
		basicProps.rows =2;
	}
	return basicProps
}

const Skeleton: React.FC<SkeletonProps> = (props:SkeletonProps) => {
	// TODO
	const {
		prefixCls:customizePrefixCls='ant-skeleton',	//这里前缀写死，未使用通用方法动态获取
		loading,
		className,
		style,
		children,
		active,
		title,
		avatar,
		paragraph,
		round
	} = props;
	const prefixCls = customizePrefixCls;
	const direction = 'ltr'	// 方向
	// loading为true，或者无loading属性
	if (loading || !('loading' in props)) {
		const hasAvatar = !!avatar;
		const hasTitle = !!title;
		const hasParagraph = !!paragraph;
		// Avatar
		let avatarNode;
		if (hasAvatar) {
			const avatarProps={
				prefixCls:`${prefixCls}-avatar`,
				...getAvatarBasicProps(hasTitle,hasParagraph),
				...getComponentProps(avatar)
			}
			avatarNode = (
				<div className={`${prefixCls}-header`} >
					<Element {...avatarProps} />
				</div>
			)
		}

		// content
		let contentNode;
		if (hasTitle || hasParagraph) {
			let $title;
			if (hasTitle) {
				const titleProps:any={
					prefixCls:`${prefixCls}-title`,
					...getComponentProps(title),
					...getTitleBasicProps(hasAvatar,hasParagraph)
				}
				$title = <Title {...titleProps} />
			}

			// paragraph
			let paragraphNode;
			if (hasParagraph) {
				const paragraphProps={
					prefixCls:`${prefixCls}-paragraph`,
					...getParagraphBasicProps(hasAvatar,hasParagraph),
					...getComponentProps(paragraph)
				}
				paragraphNode = <Paragraph {...paragraphProps} />
			}

			// content
			contentNode = (
				<div className={`${prefixCls}-content`} >
					{$title}
					{paragraphNode}
				</div>
			)
		}
		// class 处理
		const cls = classNames(prefixCls,{
			[`${prefixCls}-with-avatar`]:hasAvatar,
			[`${prefixCls}-active`]:active,
			// @ts-ignore
			[`${prefixCls}-rtl`]: direction === 'rtl',
			[`${prefixCls}-round`]: round,
		},className)
		// skeleton
		return(
			<div className={cls} style={style}>
        {avatarNode}
        {contentNode}
      </div>
		)
	}
	// loading=false
	return typeof children !=='undefined'? children : null;
	// return <div>Skeleton</div>
}
Skeleton.defaultProps = {
  avatar: false,
  title: true,
  paragraph: true,
};

Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;

export {Skeleton}