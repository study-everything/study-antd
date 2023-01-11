import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import MenuContextProvider from './context/MenuContext';
import { parseChildren } from './utils/nodeutil';
import { PathRegisterContext, PathUserContext } from './context/PathContext';
import useKeyRecords from './hook/useKeyRecords';

import useMergedState from '@study/util/src/hooks/useMergedState';

const Menu: React.FC<MenuProps> = props => {
  const {
    children,
    prefixCls = 'rc-menu',
    rootClassName,
    style,
    className,

    // Mode
    mode = 'vertical',

    // Icon
    itemIcon,
    expandIcon,

    // Selection
    multiple = false,
    selectedKeys,
    onSelect,
    onDeselect,
  } = props;

  const childList = useMemo(() => parseChildren(children), [children]);

  // =========================== Active ===========================
  const [activeKey, setActiveKey] = useState('');
  const onActive = (key: string) => {
    setActiveKey(key);
  };
  const onInactive = () => {
    setActiveKey(undefined);
  };

  // const [selectKeys, setSelectKeys] = useState([]);
  const [mergedSelectKeys, setMergedSelectKeys] = useMergedState([], { value: selectedKeys });

  const triggerSelection = info => {
    const { key: targetKey } = info;

    const exist = mergedSelectKeys.includes(targetKey);
    let newSelectKeys;

    if (multiple) {
      if (exist) {
        newSelectKeys = mergedSelectKeys.filter(key => key !== targetKey);
      } else {
        newSelectKeys = [...mergedSelectKeys, targetKey];
      }
    } else {
      newSelectKeys = [targetKey];
    }

    setMergedSelectKeys(newSelectKeys);

    const selectInfo = {
      ...info,
      selectedKeys: newSelectKeys,
    };

    if (exist) {
      onDeselect?.(selectInfo);
    } else {
      onSelect?.(selectInfo);
    }
  };

  // =========================== Open ===========================
  const onInternalClick = info => {
    triggerSelection(info);
  };

  // =========================== path ===========================
  const { registerPath, unregisterPath, isSubPathKey } = useKeyRecords();

  const registerPathContext = useMemo(
    () => ({ registerPath, unregisterPath }),
    [registerPath, unregisterPath],
  );

  const pathUserContext = useMemo(() => ({ isSubPathKey }), [isSubPathKey]);

  const container = (
    <ul
      className={classNames(
        prefixCls,
        `${prefixCls}-root`,
        `${prefixCls}-${mode}`,
        className,
        {},
        rootClassName,
      )}
    >
      {childList.map(child => child)}
    </ul>
  );

  return (
    <MenuContextProvider
      prefixCls={prefixCls}
      rootClassName={rootClassName}
      mode={mode}
      // Active
      activeKey={activeKey}
      onActive={onActive}
      onInactive={onInactive}
      // Selection
      selectedKeys={mergedSelectKeys}
      // Icon
      itemIcon={itemIcon}
      expandIcon={expandIcon}
      // Events
      onItemClick={onInternalClick}
    >
      <PathUserContext.Provider value={pathUserContext}>{container}</PathUserContext.Provider>

      <div style={{ display: 'none' }}>
        <PathRegisterContext.Provider value={registerPathContext}>
          {childList}
        </PathRegisterContext.Provider>
      </div>
    </MenuContextProvider>
  );
};

export default Menu;
