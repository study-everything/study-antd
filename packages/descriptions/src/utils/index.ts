import React from 'react';
// import toArray from 'rc-util/es/Children/toArray';
import toArray from './toArray';
import warning from '@study/util/esm/warning';
import { responsiveArray } from '@study/util/esm/responsiveObserve';
import { DEFAULT_COLUMN_MAP } from '../constants/index';

import type { ScreenMap } from '@study/util/esm/responsiveObserve';
import type { DescriptionsProps } from '../Descriptions';

/**
 * 获取指定屏幕尺寸下的列数
 *
 * @export
 * @param {DescriptionsProps['column']} column 配置的列数
 * @param {ScreenMap} screens 响应式数据
 * @return {*} 列数
 */
export function getColumns(column: DescriptionsProps['column'], screens?: ScreenMap) {
  if (typeof column === 'number') {
    return column;
  }

  // ! 响应式设置
  if (typeof column === 'object' && screens) {
    for (const breakpoint of responsiveArray) {
      if (screens[breakpoint] && column[breakpoint] !== undefined) {
        return column[breakpoint] || DEFAULT_COLUMN_MAP[breakpoint];
      }
    }
  }

  return 3;
}

/**
 * 铺满剩下列数
 *
 * @export
 * @param {React.ReactElement} node 原始虚拟节点
 * @param {(number | undefined)} span 设置的列数
 * @param {number} rowRestCol 剩余可用列数
 * @return {*}  {React.ReactElement} 铺满后的虚拟节点
 */
export function getFilledItem(
  node: React.ReactElement,
  span: number | undefined,
  rowRestCol: number,
): React.ReactElement {
  let clone = node;

  // 如果占用列太大或者没有设置列数，则设置为剩余最大列数 --- 铺满
  if (span === undefined || span > rowRestCol) {
    clone = React.cloneElement(node, {
      span: rowRestCol,
    });
    // 占用列警告断言
    warning(
      span === undefined,
      'Descriptions',
      'Sum of column `span` in a line not match `column` of Descriptions.',
    );
  }

  return clone;
}

/**
 * 咱们分个行吧
 *
 * @export
 * @param {React.ReactNode} children 原始子元素
 * @param {number} column 设置的最大列数
 * @return {*}  {React.ReactElement[][]} 分行后的子元素
 */
export function getRows(children: React.ReactNode, column: number): React.ReactElement[][] {
  const childNodes = toArray(children);
  const rows: React.ReactElement[][] = [];

  let tempRows: React.ReactElement[] = [];
  let rowRestCol = column;

  childNodes.forEach((node, index) => {
    const span = node.props.span || 1;
    const mergeSpan = span || 1;

    // 最后一个应该占用 1 行
    if (index === childNodes.length - 1) {
      tempRows.push(getFilledItem(node, span, rowRestCol));
      rows.push(tempRows);
      return;
    }

    // 小于等于剩余列数，直接进行
    if (mergeSpan < rowRestCol) {
      tempRows.push(node);
      rowRestCol -= mergeSpan;
    } else {
      // 如果占用列数大于剩余列数，则换行
      tempRows.push(getFilledItem(node, mergeSpan, rowRestCol));
      rows.push(tempRows);
      tempRows = [];
      rowRestCol = column;
    }
  });

  return rows;
}
