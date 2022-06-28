import * as React from 'react';
import TableContext from '../context/TableContext';
import Summary from './Summary';
import type { ColumnType, StickyOffsets } from '../interface';

export interface FooterProps<RecordType> {
  children: React.ReactNode;
  stickyOffsets: StickyOffsets;
  flattenColumns: FlattenColumns<RecordType>;
}

function Footer({ children }) {
  const { prefixCls } = React.useContext(TableContext);

  return <tfoot className={`${prefixCls}-summary`}>{children}</tfoot>;
}

export default Footer;
export const FooterComponents = Summary;
