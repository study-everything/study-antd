import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from './context/config-provder'

export interface GeneratorProps {
  suffixCls: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
  displayName: string;
}

export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  hasSider?: boolean;
}

export interface LayoutContextProps {
  siderHook: {
    addSider: (id: string) => void;
    removeSider: (id: string) => void;
  };
}

export const layoutContext = React.createContext<LayoutContextProps>({
  siderHook: {
    addSider: () => null,
    removeSider: () => null,
  },
});

interface BasicPropWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section';
}

function generator({ suffixCls, tagName, displayName }: GeneratorProps) {
  return (BasicComponent: any) => {
    const Adapter = React.forwardRef<HTMLElement, BasicProps>((props, ref) => {
      const { getPrefixCls } = React.useContext(ConfigContext);
      const { prefixCls: customizePrefixCls } = props;
      const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);
      return <BasicComponent ref={ref} prefixCls={prefixCls} tagName={tagName} {...props} />;
    });
    if (process.env.NODE_ENV !== 'production') {
      Adapter.displayName = displayName;
    }

    return Adapter;
  };
}

const Basic = React.forwardRef<HTMLElement, BasicPropWithTagName>((props, ref) => {
  const { prefixCls, className, children, tagName, ...others } = props;
  const classString = classNames(prefixCls, className);
  return React.createElement(tagName, { className: classString, ...others, ref }, children);
});

const BasicLyout = React.forwardRef<HTMLElement, BasicPropWithTagName>((props, ref) => {
  const { direction } = React.useContext(ConfigContext);

  const [siders, setSiders] = React.useState<string[]>([]);
  const { prefixCls, className, children, hasSider, tagName: Tag, ...others } = props;
  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : siders.length > 0,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const contextValue = React.useMemo(
    () => ({
      siderHook: {
        addSider: (id: string) => {
          setSiders(prev => [...prev, id]);
        },
        removeSider: (id: string) => {
          setSiders(prev => prev.filter(currentId => currentId !== id));
        },
      },
    }),
    [],
  );

  return (
	<layoutContext.Provider value={contextValue}>
		<Tag ref={ref} className={classString} {...others}>{children}</Tag>
	</layoutContext.Provider>
  )
});

/**
 * 布局组件
 */
const Layout = generator({
	suffixCls: 'layout',
	tagName: 'section',
	displayName: 'Layout'
})(BasicLyout)

const Header = generator({
	suffixCls: 'layout-header',
	tagName: 'header',
	displayName: 'Header'
})(Basic);

const Content = generator({
	suffixCls: 'layout-content',
	tagName: 'main',
	displayName: 'Content'
})(Basic)

const Footer = generator({
	suffixCls: 'layout-footer',
	tagName: 'footer',
	displayName: 'Footer'
})(Basic)

export { Header, Content, Footer }

export default Layout



