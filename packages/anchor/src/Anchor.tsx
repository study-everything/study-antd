import React, { useMemo, useState } from 'react';
import AnchorLink from './AnchorLink';
import AnchorContext from './AnchorContext';

export interface AnchorProps {
  onClick?: string;
  target?: string;
  children?: React.ReactNode;
}

export const Anchor: React.FC<AnchorProps> & { Link: typeof AnchorLink } = props => {
  const [activeLink, setActiveLink] = useState('');
  const contextValue = useMemo(
    () => ({
      activeLink,
      setActiveLink,
      onClick: props?.onClick,
    }),
    [activeLink, props?.onClick],
  );

  return (
    <AnchorContext.Provider value={contextValue}>
      <div>{props?.children}</div>
    </AnchorContext.Provider>
  );
};
Anchor.Link = AnchorLink;
