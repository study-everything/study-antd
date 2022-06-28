import * as React from 'react';

export interface TitleProps {
  className: string;
  children: React.ReactNode;
}

export default function Panel({ className, children }: TitleProps) {
  return <div className={className}>{children}</div>;
}
