import React, { useState, useRef, useMemo, useContext } from 'react';
import { getScroll } from './utils/getScroll';
import scrollTo from './utils/scrollTo';
import AnchorContext from './AnchorContext';

export interface LinkProps {
  href?: string; 
  target?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  targetOffset?: number;
  offsetTop?: number;
}

function getOffsetTop(element, container) {
  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return rect.top - container.clientTop;
    }
    return rect.top - container.getBoundingClientRect().top;
  }

  return rect.top;
}
const sharpMatcherRegx = /#([\S ]+)$/;
const AnchorLink: React.FC<LinkProps> = props => {
  // TODO
  const context = useContext(AnchorContext);
  const wrapperRef = useRef(null);
  const [currentLint, setCurrentLint] = useState('');
  const { href = '', title = '', target, children } = props;
  const handleScrollTo = link => {
    context.setActiveLink(link);
    const container = window;
    const scrollTop = getScroll(container, true);
    const sharpLinkMatch = sharpMatcherRegx.exec(link);
    if (!sharpLinkMatch) {
      return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
      return;
    }
    const eleOffsetTop = getOffsetTop(targetElement, container);
    let y = scrollTop + eleOffsetTop;
    y -= props.targetOffset !== undefined ? props.targetOffset : props.offsetTop || 0;
    scrollTo(y);
  };

  const isActive = useMemo(() => context.activeLink === href, [context.activeLink]);
  return (
    <div
      ref={wrapperRef}
      onClick={e => {
        e.stopPropagation();
        handleScrollTo(href);
      }}
    >
      <a
        href={href}
        className={isActive ? 'link-color' : ''}
        title={typeof title === 'string' ? title : ''}
        target={target}
      >
        {title}
      </a>
      {children}
    </div>
  );
};
export default AnchorLink;
