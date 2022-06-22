import type { ComponentMeta } from '@storybook/react';
import { Descriptions } from '.';
import './Descriptions.stories.less';
import './style';

export * from './demos';

const Stories: ComponentMeta<typeof Descriptions> = {
  title: 'Descriptions',
  component: Descriptions,
  args: {
    size: 'default',
    bordered: false,
    layout: 'horizontal',
  },
  // argTypes: {
  //   size: {
  //     options: ['default', 'middle', 'small'],
  //     control: { type: 'select' },
  //   },
  // },
};

export default Stories;
