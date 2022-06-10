import './style';
import './Spin.stories.less';
declare const _default: {
    title: string;
    component: import("./Spin").SpinFCType;
    args: {
        spinning: boolean;
        size: string;
        tip: string;
        direction: string;
        delay: number;
    };
    argTypes: {
        wrapperClassName: {
            table: {
                disable: boolean;
            };
        };
        style: {
            table: {
                disable: boolean;
            };
        };
        className: {
            table: {
                disable: boolean;
            };
        };
        spinning: {
            control: string;
            description: string;
        };
        size: {
            options: string[];
            control: {
                type: string;
            };
            description: string;
        };
        direction: {
            options: string[];
            control: {
                type: string;
            };
            description: string;
        };
        tip: {
            control: string;
            description: string;
        };
        delay: {
            control: string;
            description: string;
        };
        indicator: {
            control: string;
            description: string;
        };
    };
};
export default _default;
export declare const Basic: {
    (args: any): JSX.Element;
    display: string;
};
export declare const Indicator: (args: any) => JSX.Element;
