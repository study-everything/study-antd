import React from 'react';

export default function Icon({ icon, props, children }) {
  let iconNode;

  if (typeof icon === 'function') {
    iconNode = React.createElement(icon, {
      ...props,
    });
  } else {
    iconNode = icon;
  }

  return iconNode || children || null;
}
