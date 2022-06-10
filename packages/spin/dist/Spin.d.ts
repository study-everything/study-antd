import React from 'react';
declare const SpinSizes: ["small", "default", "large"];
export declare type SpinSize = typeof SpinSizes[number];
export declare type SpinIndicator = React.ReactElement<HTMLElement>;
export declare type DirectionType = 'ltr' | 'rtl' | undefined;
export interface SpinState {
    spinning?: boolean;
    notCssAnimationSupported?: boolean;
}
export interface SpinProps {
    wrapperClassName?: string;
    style?: React.CSSProperties;
    className?: string;
    spinning?: boolean;
    size?: SpinSize;
    tip?: React.ReactNode;
    delay?: number;
    indicator?: SpinIndicator;
    children?: React.ReactNode;
    direction?: DirectionType;
}
export declare const Spin: SpinFCType;
export declare type SpinFCType = React.FC<SpinProps> & {
    setDefaultIndicator: (indicator: React.ReactNode) => void;
};
export {};
