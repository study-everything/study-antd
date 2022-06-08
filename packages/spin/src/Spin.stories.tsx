import React, { useEffect } from 'react';
import { Spin } from './Spin';
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
  component: Spin,
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
  },
};

export const Basic = args => {
  useEffect(() => {});
  return (
    <div>
      <div className="block">
        <h3>默认</h3>
        <Spin {...args} />
      </div>
      <div className="block">
        <h3>包裹容器</h3>
        <Spin {...args}>
          <div className="container" />
        </Spin>
      </div>
      <div className="block">
        <h3>放入容器中</h3>
        <div className="container">
          <Spin {...args} />
        </div>
      </div>
    </div>
  );
};

Basic.display = '基础属性';

export const Indicator = args => (
  <>
    <div className="block">
      <h3>自定义指示器</h3>
      <div className="my-spin" />
    </div>
    <div className="block">
      <h3>新的Spin</h3>
      <Spin {...args} indicator={<div className="my-spin" />} />
    </div>
  </>
);
