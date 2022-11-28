
import React, { useContext, useMemo } from 'react'
import classNames from 'classnames';
import RcDrawer from './rc-drawer';
import DrawerPanel from './DrawerPanel';
import ConfigContext from './config-provider/context'
import { getTransitionName } from './util';

import type { RcDrawerProps } from './rc-drawer';
import type { DrawerPanelProps } from './DrawerPanel';
import type { CSSMotionProps } from 'rc-motion';

type sizeType = 'default' | 'large'
export interface PushState {
	distance: string | number;
}
export interface DrawerProps extends RcDrawerProps, Omit<DrawerPanelProps, 'prefixCls'> {
	size?: sizeType;
	open?: boolean;
	afterOpenChange?: (open: boolean) => void;
}

const defaultPushState: PushState = { distance: 180 };
export const Drawer: React.FC<DrawerProps> = (props) => {
	const {
		rootClassName,
		width,
		height,
		size = 'default',
		mask = true,
		push = defaultPushState,
		open,
		afterOpenChange,
		onClose,
		prefixCls: customizePrefixCls,
		getContainer: customizeGetContainer,
		...rest
	} = props;
	const { getPrefixCls, getPopupContainer, direction } = useContext(ConfigContext);
	// 获取类名
	const prefixCls = getPrefixCls('drawer', customizePrefixCls);
	// 获取drawer父容器
	const getContainer = customizeGetContainer === false && !!getPopupContainer ? () => getPopupContainer(document.body) : customizeGetContainer;
	// 组装类名
	const drawerCls = classNames({
		'no-mask': !mask,
		[`${prefixCls}-rtl`]: direction === 'rtl',
		rootClassName
	});
	// 宽高设置
	const mergedWidth = useMemo(() => {
		return width ?? (size === 'large' ? 736 : 378);
	}, [width, size]);
	const mergdHeight = useMemo(() => {
		return height ?? (size === 'large' ? 736 : 378);
	}, [height, size]);
	// =========================== 动画 ===========================
	const maskMotion: CSSMotionProps = {
		motionName: getTransitionName(prefixCls, 'mask-motion'),
		motionAppear: true,
		motionEnter: true,
		motionLeave: true,
		motionDeadline: 500,
	};
	const panelMotion: RcDrawerProps['motion'] = (motionPlacement) => ({
    motionName: getTransitionName(prefixCls, `panel-motion-${motionPlacement}`),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500,
  });
	// TODO
	return (
		<RcDrawer
			prefixCls={prefixCls}
			onClose={onClose}
			maskMotion={maskMotion}
			motion={panelMotion}
			{...rest}
			open={open}
			mask={mask}
			push={push}
			width={mergedWidth}
			height={mergdHeight}
			rootClassName={drawerCls}
			getContainer={getContainer}
			afterOpenChange={afterOpenChange}
		>
			<DrawerPanel
				prefixCls={prefixCls}
				{...rest}
				onClose={onClose}
			/>
		</RcDrawer>
	)
}