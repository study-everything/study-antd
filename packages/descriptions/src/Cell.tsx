import React, { useCallback } from 'react';
import classNames from 'classnames';

/**
 * 是否是空
 *
 * @param {unknown} val
 * @return {*}  {boolean}
 */
function isEmpty(val: unknown): boolean {
  return [null, undefined].includes(val);
}

export interface CellProps {
  itemPrefixCls: string;
  span: number;
  className?: string;
  component: 'td' | 'th';
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  bordered?: boolean;
  label?: React.ReactNode;
  content?: React.ReactNode;
  colon?: boolean;
}

const Cell: React.FC<CellProps> = (props) => {
  const {
    itemPrefixCls,
    span,
    className,
    component = 'td',
    style,
    labelStyle,
    contentStyle,
    bordered,
    label,
    content,
    colon,
  } = props;

  const Component = useCallback(
    (componentProps: React.TdHTMLAttributes<HTMLTableCellElement> | React.ThHTMLAttributes<HTMLTableCellElement>) => {
      const { children, ...lastComponentProps } = componentProps;
      return React.createElement(component, lastComponentProps, children);
    },
    [component],
  );

  if (bordered) {
    return (
      <Component
        className={classNames(
          {
            [`${itemPrefixCls}-item-label`]: !isEmpty(label),
            [`${itemPrefixCls}-item-content`]: !isEmpty(content),
          },
          className
        )}
        style={style}
        colSpan={span}
      >
        {!isEmpty(label) && (
          <span style={labelStyle}>
            {label}
          </span>
        )}
        {!isEmpty(content) && (
          <span style={contentStyle}>
            {content}
          </span>
        )}
      </Component>
    );
  }

  return (
    <Component
      className={classNames(`${itemPrefixCls}-item`, className)}
      style={style}
      colSpan={span}
    >
      <div className={`${itemPrefixCls}-item-container`}>
        {(label || label === 0) && (
          <span
            className={classNames(`${itemPrefixCls}-item-label`, {
              [`${itemPrefixCls}-item-no-colon`]: !colon,
            })}
            style={labelStyle}
          >
            {label}
          </span>
        )}
        {(content || content === 0) && (
          <span
            className={classNames(`${itemPrefixCls}-item-content`)}
            style={contentStyle}
          >
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

Cell.displayName = 'DescriptionsCell';

export default Cell;
