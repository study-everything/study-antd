import classNames from 'classnames';
import * as React from 'react';
import Cell from '../Cell';
import BodyContext from '../context/BodyContext';
import TableContext from '../context/TableContext';
import { getColumnsKey } from '../utils/valueUtil';

function BodyRow(props) {
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

  const nestExpandable = expandableType === 'nest';
  const hasNestChildren = childrenColumnName && record && record[childrenColumnName];

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
        return (
          <Cell
            className={columnClassName}
            // ellipsis={column.ellipsis}
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
          />
        );
      })}
    </RowComponent>
  );

  return baseRowNode;
}

BodyRow.displayName = 'BodyRow';

export default BodyRow;
