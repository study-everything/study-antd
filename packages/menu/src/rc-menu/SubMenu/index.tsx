import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../context/MenuContext';
import Icon from '../Icon';
import {
  PathTrackerContext,
  PathUserContext,
  useFullPath,
  useMeasure,
} from '../context/PathContext';
import { parseChildren } from '../utils/nodeutil';
import SubMenuList from './SubMenuList';

const InternalSubMenu = (props: SubMenuProps) => {
  const {
    style,
    className,

    title,
    eventKey,

    children,

    // Icons
    expandIcon,

    // Events
    onMouseEnter,
    onMouseLeave,
  } = props;

  const {
    prefixCls, // SelectKey
    selectedKeys,
    mode,

    // Icon
    expandIcon: contextExpandIcon,
  } = useContext(MenuContext);

  // =========================== Icon ===========================
  const mergedExpandIcon = expandIcon || contextExpandIcon;

  const subMenuPrefixCls = `${prefixCls}-submenu`;

  // =========================== Select ===========================

  const { isSubPathKey } = useContext(PathUserContext);

  const childrenSelected = isSubPathKey(selectedKeys, eventKey);
  console.log('childrenSelected', childrenSelected);

  // =========================== Title ===========================

  const connectedKeyPath = useFullPath(eventKey);
  const childList = parseChildren(children, connectedKeyPath);

  const [childrenActive, setChildrenActive] = useState(false);

  const triggerChildrenActive = (newActive: boolean) => {
    setChildrenActive(newActive);
  };

  const onInternalMouseEnter: React.MouseEventHandler<HTMLElement> = domEvent => {
    triggerChildrenActive(true);
    onMouseEnter?.({
      key: eventKey,
      domEvent,
    });
  };

  const onInternalMouseLeave: React.MouseEventHandler<HTMLElement> = domEvent => {
    triggerChildrenActive(false);
    onMouseLeave?.({
      key: eventKey,
      domEvent,
    });
  };
  let titleNode = (
    <div>
      {title}

      <Icon
        icon={mode !== 'horizontal' ? mergedExpandIcon : null}
        props={{
          ...props,
          // isOpen: open,
          isSubMenu: true,
        }}
      >
        <i className={`${subMenuPrefixCls}-arrow`} />
      </Icon>
    </div>
  );

  return (
    <li
      style={style}
      className={classNames(subMenuPrefixCls, className, {
        [`${subMenuPrefixCls}-active`]: childrenActive,
        [`${subMenuPrefixCls}-selected`]: childrenSelected,
      })}
      onMouseEnter={onInternalMouseEnter}
      onMouseLeave={onInternalMouseLeave}
    >
      <div className={`${subMenuPrefixCls}-title`}>{titleNode}</div>
      <SubMenuList>{childList}</SubMenuList>
    </li>
  );
};

export default function SubMenu(props) {
  const { eventKey, children } = props;
  const connectedKeyPath = useFullPath(eventKey);

  const childList = parseChildren(children, connectedKeyPath);

  const measure = useMeasure();

  useEffect(() => {
    if (measure) {
      measure.registerPath(eventKey, connectedKeyPath);
      return () => {
        measure.unregisterPath(eventKey, connectedKeyPath);
      };
    }
  }, [connectedKeyPath]);

  let renderNode: React.ReactNode;
  if (measure) {
    renderNode = childList;
  } else {
    renderNode = <InternalSubMenu {...props}>{childList}</InternalSubMenu>;
  }

  return (
    <PathTrackerContext.Provider value={connectedKeyPath}>{renderNode}</PathTrackerContext.Provider>
  );
}
