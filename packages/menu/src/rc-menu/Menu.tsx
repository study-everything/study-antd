import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import MenuContextProvider from './context/MenuContext';
import { parseChildren } from './utils/nodeutil';

const Menu: React.FC<MenuProps> = props => {
  const { children, prefixCls = 'rc-menu', rootClassName, style, className } = props;

  const childList = useMemo(() => parseChildren(children), [children]);

  // =========================== Active ===========================
  const [activeKey, setActiveKey] = useState('');
  const onActive = (key: string) => {
    setActiveKey(key);
  };
  const onInactive = () => {
    setActiveKey(undefined);
  };

  return (
    <MenuContextProvider
      prefixCls={prefixCls}
      rootClassName={rootClassName}
      // Active
      activeKey={activeKey}
      onActive={onActive}
      onInactive={onInactive}
    >
      <div className={classNames(prefixCls, `${prefixCls}-root`, className)}>
        <ul>{childList.map(child => child)}</ul>
      </div>
    </MenuContextProvider>
  );
};

export default Menu;
