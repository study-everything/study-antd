import { createContext, useContext, useMemo } from 'react';

export const MenuContext = createContext<MenuContextProps>(null);

function mergeProps(origin, target) {
  const clone = { ...origin };

  Object.keys(target).forEach(key => {
    const value = target[key];
    if (value !== undefined) {
      clone[key] = value;
    }
  });

  return clone;
}

export default function InheritableContextProvider({ children, ...restProps }) {
  const context = useContext(MenuContext);

  const inheritableContext = useMemo(() => mergeProps(context, restProps), [context, restProps]);

  return <MenuContext.Provider value={inheritableContext}>{children}</MenuContext.Provider>;
}
