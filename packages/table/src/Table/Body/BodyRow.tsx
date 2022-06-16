import classNames from 'classnames';
import * as React from 'react';
import Cell from '../Cell';
import BodyContext from '../context/BodyContext';
import TableContext from '../context/TableContext';
import { getColumnsKey } from '../utils/valueUtil';
import type {
  ColumnType,
  CustomizeComponent,
  GetComponentProps,
  Key,
  GetRowKey,
} from '../interface';

export interface BodyRowProps<RecordType> {
  record: RecordType;
  index: number;
  renderIndex: number;
  className?: string;
  style?: React.CSSProperties;
  recordKey: Key;
  expandedKeys: Set<Key>;
  rowComponent: CustomizeComponent;
  cellComponent: CustomizeComponent;
  onRow: GetComponentProps<RecordType>;
  rowExpandable: (record: RecordType) => boolean;
  indent?: number;
  rowKey: React.Key;
  getRowKey: GetRowKey<RecordType>;
  childrenColumnName: string;
}

function BodyRow<RecordType extends { children?: readonly RecordType[] }>(
  props: BodyRowProps<RecordType>,
) {
  const {
    className,
    style,
    record,
    index,
    renderIndex,
    rowKey,
    rowExpandable,
    expandedKeys,
    onRow,
    indent = 0,
    rowComponent: RowComponent,
    cellComponent,
    childrenColumnName,
  } = props;
  const { prefixCls } = React.useContext(TableContext);
  const {
    flattenColumns,
    expandIconColumnIndex,
    expandableType,
    expandIcon,
    onTriggerExpand,
    indentSize,
  } = React.useContext(BodyContext);

  const [expandRended, setExpandRended] = React.useState(false);

  const expanded = expandedKeys && expandedKeys.has(props.recordKey);

  React.useEffect(() => {
    if (expanded) {
      setExpandRended(true);
    }
  }, [expanded]);

  const rowSupportExpand = expandableType === 'row' && (!rowExpandable || rowExpandable(record));

  const nestExpandable = expandableType === 'nest';
  const hasNestChildren = childrenColumnName && record && record[childrenColumnName];
  const mergedExpandable = rowSupportExpand || nestExpandable;

  // ======================== Expandable =========================
  // const onExpandRef = React.useRef(onTriggerExpand);
  // onExpandRef.current = onTriggerExpand;

  // const onInternalTriggerExpand = (...args: Parameters<typeof onTriggerExpand>) => {
  //   onExpandRef.current(...args);
  // };

  const columnsKey = getColumnsKey(flattenColumns); // ['a','b','c','d']
  const baseRowNode = (
    <RowComponent
      className={classNames(className, `${prefixCls}-row`, `${prefixCls}-row-level-${indent}`)}
    >
      {flattenColumns.map((column, colIndex) => {
        const { render, dataIndex, className: columnClassName } = column;
        const key = columnsKey[colIndex];

        // ============= Used for nest expandable =============
        let appendCellNode: React.ReactNode;
        if (colIndex === (expandIconColumnIndex || 0) && nestExpandable) {
          appendCellNode = (
            <>
              <span
                style={{ paddingLeft: `${indentSize * indent}px` }}
                className={`${prefixCls}-row-indent indent-level-${indent}`}
              />
              {expandIcon({
                prefixCls,
                expanded,
                expandable: hasNestChildren,
                record,
                onExpand: onTriggerExpand,
              })}
            </>
          );
        }
        let additionalCellProps: React.HtmlHTMLAttributes<HTMLElement>;
        if (column.onCell) {
          additionalCellProps = column.onCell(record, index);
        }
        return (
          <Cell
            className={columnClassName}
            ellipsis={column.ellipsis}
            prefixCls={prefixCls}
            key={key}
            record={record}
            index={index}
            renderIndex={renderIndex}
            dataIndex={dataIndex}
            render={render}
            component={cellComponent}
            expanded={appendCellNode}
            appendNode={appendCellNode}
            additionalProps={additionalCellProps}
          />
        );
      })}
    </RowComponent>
  );

  return baseRowNode;
}

BodyRow.displayName = 'BodyRow';

export default BodyRow;
