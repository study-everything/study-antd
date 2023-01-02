import Menu from './Menu';
import MenuItem from './MenuItem';

export { MenuItem as Item };

const ExportMenu = Menu;

ExportMenu.Item = MenuItem;

export default ExportMenu;
