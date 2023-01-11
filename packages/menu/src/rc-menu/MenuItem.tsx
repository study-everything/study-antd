import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { MenuContext } from './context/MenuContext';
import useActive from './hook/useActive';
import { useFullPath, useMeasure } from './context/PathContext';
import useDirectionStyle from './hook/useDirectionStyle';

const InternalMenuItem = (props: MenuItemProps) => {
  const { style, className, children, eventKey } = props;

  const {
    prefixCls,
    onItemClick,

    // Select
    selectedKeys,
  } = useContext(MenuContext);

  const itemCls = `${prefixCls}-item`;

  const connectedKeyPath = useFullPath(eventKey);

  // =========================== Info ===========================

  const getEventInfo = e => ({
    key: eventKey,
    keyPath: [],
    item: '',
    domEvent: e,
  });

  // =========================== Active ===========================

  const { active, ...activeProps } = useActive({
    eventKey,
  });

  // =========================== Select ===========================
  const selected = selectedKeys.includes(eventKey);

  // =========================== Direction ===========================
  const directionStyle = useDirectionStyle(connectedKeyPath.length);

  // =========================== Events ===========================

  const onInternalClick = e => {
    const info = getEventInfo(e);

    onItemClick(info);
  };

  return (
    <li
      {...activeProps}
      style={{
        ...directionStyle,
        ...style,
      }}
      className={classNames(
        itemCls,
        {
          [`${itemCls}-active`]: active,
          [`${itemCls}-selected`]: selected,
        },
        className,
      )}
      onClick={onInternalClick}
    >
      {children}
    </li>
  );
};

export default function MenuItem(props) {
  const { eventKey } = props;

  const measure = useMeasure();
  const connectedKeyPath = useFullPath(eventKey);

  useEffect(() => {
    if (measure) {
      measure.registerPath(eventKey, connectedKeyPath);

      return () => {
        measure.unregisterPath(eventKey, connectedKeyPath);
      };
    }
  }, [connectedKeyPath]);

  if(measure){
    return null
  }

  return <InternalMenuItem {...props} />;
}
