import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './context/MenuContext';
import useActive from './hook/useActive';

const MenuItem = (props: MenuItemProps) => {
  const { style, className, children, eventKey } = props;

  const { prefixCls } = useContext(MenuContext);

  const itemCls = `${prefixCls}-item`;

  // =========================== Active ===========================

  const { active, ...activeProps } = useActive({
    eventKey,
  });

  return (
    <li
      {...activeProps}
      className={classNames(
        itemCls,
        {
          [`${itemCls}-active`]: active,
        },
        className,
      )}
    >
      {children}
    </li>
  );
};

export default MenuItem;
