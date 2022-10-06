// TODO 待阅读
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from './config-provider';
import type { SizeType } from './config-provider/SizeContext';
import warning from './utils/warning';

export interface ButtonGroupProps {
    size?: SizeType;
    style?: React.CSSProperties;
    className?: string;
    prefixCls?: string;
    children?: React.ReactNode;
}

export const GroupSizeContext = React.createContext<SizeType | undefined>(undefined);

const ButtonGroup: React.FC<ButtonGroupProps> = props => {
    const { getPrefixCls, direction } = React.useContext(ConfigContext);

    const { prefixCls: customizePrefixCls, size, className, ...others } = props;
    const prefixCls = getPrefixCls('btn-group', customizePrefixCls);

    // large => lg
    // small => sm
    // 尺寸
    let sizeCls = '';
    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
            break;
        case 'middle':
        case undefined:
            break;
        default:
            warning(!size, 'Button.Group', 'Invalid prop `size`.');
    }

    // 样式类设置
    const classes = classNames(
        prefixCls,
        {
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
    );

    return (
        <GroupSizeContext.Provider value={size}>
            {/* 包装返回 */}
            <div {...others} className={classes} />
        </GroupSizeContext.Provider>
    );
};

export default ButtonGroup;
