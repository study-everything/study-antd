import InternalLayout, { Content, Footer, Header } from './layout';
import Sider from './Sider'

export { BasicProps as LayoutProps } from './layout';
export { SiderProps } from './Sider'

type InternalLayoutType = typeof InternalLayout;

export interface LayoutType extends InternalLayoutType {
    Header: typeof Header
    Footer: typeof Footer
    Content: typeof Content
    Sider: typeof Sider
}

const Layout = InternalLayout as LayoutType;

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Sider = Sider;

export default Layout