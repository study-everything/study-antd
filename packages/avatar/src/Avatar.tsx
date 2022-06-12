
import * as React from 'react';
import classNames from 'classnames'
import type { AvatarSize, AvatarShape } from './Context';
import { ConfigContext, SizeContext } from './Context'

export interface AvatarProps {
	shape?: AvatarShape;
	size?: AvatarSize;
	src?: React.ReactNode;
	icon?: React.ReactNode;
	style?: React.CSSProperties;
	prefixCls?: string;
  className?: string;
	children?: React.ReactNode;
	draggable?: boolean;
	alt?: string;
	srcSet?: string,
	crossOrigin?: "" | "anonymous" | "use-credentials";
	onError?: () => boolean;
}


export const InternalAvatar: React.FC<AvatarProps> = (props) => {
	const {
    prefixCls: customizePrefixCls,
    shape,
    size: customSize,
    src,
    icon,
    className,
    alt,
		srcSet,
		crossOrigin,
    children,
		draggable,
    ...others
  } = props;

	
	const [isImgExist, setIsImgExist] = React.useState(true);
	React.useEffect(() => {
		setIsImgExist(true)
	}, [])
	
	const { getPrefixCls } = React.useContext(ConfigContext) 
	const prefixCls = getPrefixCls('avatar', customizePrefixCls);
	
	const groupSize = React.useContext(SizeContext);
	const size = customSize === 'default' ? groupSize : customSize;
	const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
  });


	const classString = classNames(
		prefixCls,
		sizeCls,
		{
			[`${prefixCls}-${shape}`]: !!shape,
			[`${prefixCls}-image`]: !!src,
			[`${prefixCls}-icon`]: !!icon
		},
		className
	)

	const handleImgLoadError = () => {
		const { onError } = props
		const errorFlag = onError ? onError() : undefined
		if (errorFlag !== false) {
			setIsImgExist(false);
		}
	}

	const hasImageElement = React.isValidElement(src)
	// fallback行为
	let childrenToRender;
	if (typeof src === 'string' && isImgExist) {
		childrenToRender = (
			<img 
				src={src} 
				alt={alt} 
				srcSet={srcSet}
				crossOrigin={crossOrigin}
				draggable={draggable}
				onError={handleImgLoadError}
			/>
		)
	} else if (hasImageElement) {
		childrenToRender = src
	} else if (icon) {
		childrenToRender = icon;
	} else {
		childrenToRender = children
	}
	
	return (
		<span 
			className={classString}
			style={{ ...others.style }}
		>
			{childrenToRender}
		</span>
	)
}

const Avatar = React.forwardRef<unknown, AvatarProps>(InternalAvatar);
Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  shape: 'circle' as AvatarProps['shape'],
  size: 'default' as AvatarProps['size'],
};
export default Avatar;