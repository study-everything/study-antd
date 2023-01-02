import toArray from '@study/util/src/Children/toArray';
import React from 'react';

export function parseChildren(children, keyPath = []) {
  return toArray(children).map((child, index) => {
    if (React.isValidElement(child)) {
      const { key } = child;
      let eventKey = (child.props as any)?.eventKey ?? key;

      const emptyKey = eventKey === null || eventKey === undefined;
      if (emptyKey) {
        eventKey = `tmp_key-${[...keyPath, index].join('-')}`;
      }

      const cloneProps = {
        key: eventKey,
        eventKey,
      };

      return React.cloneElement(child, cloneProps);
    }
    return child;
  });
}

export default 1;
