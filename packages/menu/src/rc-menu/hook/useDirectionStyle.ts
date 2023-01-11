import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

export default function useDirectionStyle(level: number): React.CSSProperties {
  // const {} = useContext(MenuContext)

  return {
    paddingLeft: level * 24,
  };
}
