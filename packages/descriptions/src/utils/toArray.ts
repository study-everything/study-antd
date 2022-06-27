import React from 'react';
import { isFragment } from 'react-is';

export interface Option {
  keepEmpty?: boolean;
}

function toArray(
  children: React.ReactNode,
  option: Option = {},
): React.ReactElement[] {
  let childList: React.ReactElement[] = [];

  React.Children.forEach(children, (item: React.ReactElement) => {
    if ([undefined, null].includes(item) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(item)) {
      childList = childList.concat(toArray(item));
    } else if (isFragment(item) && item.props) {
      childList = childList.concat(toArray(item.props.children, option));
    } else {
      childList.push(item);
    }
  });

  return childList;
}

export default toArray;
