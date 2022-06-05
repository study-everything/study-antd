import React, { useEffect } from 'react';
import { SpinFC } from './Spin';
import './style';
import './Spin.stories.less';

const primaryArgTypes = {
  spinning: {
    control: 'boolean',
    description: '是否为加载中状态',
  },
  size: {
    options: ['small', 'default', 'large'],
    control: { type: 'radio' },
    description: '组件大小',
  },
  direction: {
    options: ['rtl', 'ltr'],
    control: { type: 'radio' },
    description: '加载动画，文字排列方向，原版并没有在组件中暴露该属性',
  },
  tip: {
    control: 'text',
    description: '当作为包裹元素时，可以自定义描述文案',
  },
  delay: {
    control: 'number',
    description:
      '延迟显示加载效果的时间（防止闪烁），单位是毫秒(调整完该值记得切换spinning来查看效果)',
  },
  indicator: {
    control: 'ReactNode',
    description: '加载指示符',
  },
};

const primaryArgs = {
  spinning: true,
  size: 'default',
  tip: 'Loading...',
  direction: 'ltr',
  delay: 0,
};

export default {
  title: 'Spin',
  component: SpinFC,
  args: primaryArgs,
  argTypes: {
    ...primaryArgTypes,
    wrapperClassName: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    indicator: {
      table: {
        disable: true,
      },
    },
  },
};

// function getNewArgsMap(keyArr: string[]) {
//   const result = {};
//   Object.keys(primaryArgs)
//     .filter(key => keyArr.includes(key))
//     .forEach(key => {
//       result[key] = primaryArgs[key];
//     });
//   return result;
// }

// function getNewArgTypesMap(keyArr: string[]) {
//   const result = {};
//   Object.keys(primaryArgTypes).forEach(key => {
//     result[key] = Object.assign(primaryArgTypes[key], {
//       table: {
//         disable: !keyArr.includes(key),
//       },
//     });
//   });
//   return result;
// }

export const Basic = args => {
  //   const  = someFunction(delay);
  useEffect(() => {});
  return (
    <div>
      <div className="desc-block">
        <h3>默认</h3>
        <SpinFC {...args} />
      </div>
      <div className="desc-block">
        <h3>包裹容器</h3>
        <SpinFC {...args}>
          <div style={{ width: '100%', height: '100px', background: 'lavender' }}>hello</div>
        </SpinFC>
      </div>
      <div className="desc-block">
        <h3>放入容器中</h3>
        <div style={{ width: '100%', height: '100px', background: 'lavender' }}>
          <SpinFC {...args} />
        </div>
      </div>
    </div>
  );
};

// const BasicArgList = ['spinning', 'size', 'direction', 'tip'];
// Basic.argTypes = getNewArgTypesMap(BasicArgList);
// Basic.args = getNewArgsMap(BasicArgList);

export const Indicator = () => (
  <>
    <h3>indicator</h3>
    <div className="my-spin" />
    <SpinFC spinning indicator={<div className="my-spin" />} />
  </>
);
