import React, { useContext } from 'react';
import Cell from './Cell';
import { DescriptionsContext } from './contexts';

import type { DescriptionsItemProps } from './Item';
import type { CellProps } from './Cell';
import type { DescriptionsContextProps } from './contexts';

interface CellConfig {
  component: CellProps['component'] | [CellProps['component'], CellProps['component']];
  type: string;
  showLabel?: boolean;
  showContent?: boolean;
}

function renderCells(
  items: Array<React.ReactElement<DescriptionsItemProps>>,
  { colon, prefixCls, bordered }: RowProps,
  {
    component,
    type,
    showLabel,
    showContent,
    labelStyle: rootLabelStyle,
    contentStyle: rootContentStyle,
  }: CellConfig & DescriptionsContextProps,
): React.ReactNode {
  return items.map((item, index) => {
    const {
      props: {
        label,
        children,
        prefixCls: itemPrefixCls = prefixCls,
        className,
        style,
        labelStyle,
        contentStyle,
        span = 1,
      },
      key,
    } = item;

    if (typeof component === 'string') {
      return (
        <Cell
          key={`${type}-${key || index}`}
          className={className}
          itemPrefixCls={itemPrefixCls}
          span={span}
          component={component}
          colon={colon}
          bordered={bordered}
          label={showLabel ? label : null}
          content={showContent ? children : null}
          style={style}
          labelStyle={{ ...rootLabelStyle, ...labelStyle }}
          contentStyle={{ ...rootContentStyle, ...contentStyle }}
        />
      );
    }

    return [
      (
        <Cell
          key={`label-${key || index}`}
          className={className}
          itemPrefixCls={itemPrefixCls}
          span={1}
          component={component[0]}
          colon={colon}
          bordered={bordered}
          label={label}
          style={{ ...style, ...rootLabelStyle, ...labelStyle }}
        />
      ),
      (
        <Cell
          key={`content-${key || index}`}
          className={className}
          itemPrefixCls={itemPrefixCls}
          span={span * 2 - 1}
          component={component[1]}
          bordered={bordered}
          content={children}
          style={{ ...style, ...rootContentStyle, ...contentStyle }}
        />
      ),
    ];
  });
}

export interface RowProps {
  prefixCls: string;
  vertical: boolean;
  row: Array<React.ReactElement<DescriptionsItemProps>>;
  bordered?: boolean;
  colon: boolean;
  index: number;
  children?: React.ReactNode;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    prefixCls,
    vertical,
    row,
    bordered,
    colon,
    index,
    children,
  } = props;

  const rootStyle = useContext(DescriptionsContext);

  if (vertical) {
    return (
      <>
        <tr
          key={`label-${index}`}
          className={`${prefixCls}-row`}
        >
          {renderCells(row, props, {
            component: 'th',
            type: 'label',
            showLabel: true,
            ...rootStyle,
          })}
        </tr>
        <tr
          key={`content-${index}`}
          className={`${prefixCls}-row`}
        >
          {renderCells(row, props, {
            component: 'td',
            type: 'content',
            showContent: true,
            ...rootStyle,
          })}
        </tr>
      </>
    );
  }

  return (
    <tr
      key={index}
      className={`${prefixCls}-row`}
    >
      {renderCells(row, props, {
        component: bordered ? ['th', 'td'] : 'td',
        type: 'item',
        showLabel: true,
        showContent: true,
        ...rootStyle,
      })}
    </tr>
  );
};

Row.displayName = 'DescriptionsRow';

export default Row;
