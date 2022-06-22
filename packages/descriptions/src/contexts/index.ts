import React from 'react';

export interface DescriptionsContextProps {
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export const DescriptionsContext = React.createContext<DescriptionsContextProps>({});
