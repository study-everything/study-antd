
import React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import type { AvatarSize } from './Context'
import { ConfigContext, SizeContextProvider } from './Context'
import { cloneElement } from './utils'

export interface GroupProps {
	className?: string,
	children?: React.ReactNode;
	prefixCls?: string,
	maxCount?: number;
	size?: AvatarSize;
	style?: React.CSSProperties;
	maxStyle?: React.CSSProperties;
}


const Group: React.FC<GroupProps> = (props) => {
	const { getPrefixCls } = React.useContext(ConfigContext)

	const {
		prefixCls: customizePrefixCls,
		className = '',
		maxCount,
		children,
		size
	} = props;

	const prefixCls = getPrefixCls('avatar-group', customizePrefixCls)
	const cls = classNames(
		prefixCls,
		className
	)

	const childrenWithProps = toArray(children).map((child, index) =>
    cloneElement(child, {
      key: `avatar-key-${index}`,
    }),
  );

	const numOfChildren = childrenWithProps.length;
	if (maxCount && maxCount < numOfChildren) {
		const childrenShow = childrenWithProps.slice(0, maxCount);
		return (
      <SizeContextProvider size={size}>
        <div className={cls} style={props.style}>
          {childrenShow}
        </div>
      </SizeContextProvider>
    );
	}
	// TODO
	return (
		<SizeContextProvider size={size}>
			<div className={cls} style={props.style}>
				{childrenWithProps}
			</div>
		</SizeContextProvider>
	)
}
export default Group