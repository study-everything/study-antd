import classNames from 'classnames';
import React, { forwardRef, useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

const InternalSubMenuList = ({ className, children, ...restProps }, ref) => {
  const { prefixCls, mode } = useContext(MenuContext);

  return (
    <ul
      className={classNames(
        prefixCls,
        `${prefixCls}-sub`,
        `${prefixCls}-${mode === 'inline' ? 'inline' : 'vertical'}`,
        className,
      )}
      role="menu"
      {...restProps}
      ref={ref}
    >
      {children}
    </ul>
  );
};

const SubMenuList = forwardRef(InternalSubMenuList);
SubMenuList.displayName = 'SubMenuList';

export default SubMenuList;
