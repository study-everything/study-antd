import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

export default function useActive({ eventKey }) {
  const { activeKey, onActive, onInactive } = useContext(MenuContext);

  const ret: ActiveObj = {
    active: activeKey === eventKey,
  };

  ret.onMouseEnter = domEvent => {
    onActive(eventKey);
  };

  ret.onMouseLeave = domEvent => {
    onInactive(eventKey);
  };

  return ret;
}
