import Menu from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

export { MenuItem as Item, SubMenu };

type MenuType = typeof Menu & {
  Item: typeof MenuItem;
  SubMenu: typeof MenuItem;
};

const ExportMenu = Menu as MenuType;

ExportMenu.Item = MenuItem;
ExportMenu.SubMenu = SubMenu;

export default ExportMenu;
