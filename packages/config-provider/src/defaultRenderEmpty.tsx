import * as React from 'react';
import Empty from 'antd/lib/empty';
import type { ConfigConsumerProps } from './ConfigProvider';
import { ConfigConsumer } from './ConfigProvider';

const defaultRenderEmpty = (componentName?: string): React.ReactNode => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const prefix = getPrefixCls('empty');

      switch (componentName) {
        case 'Table':
        case 'List':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={`${prefix}-small`} />;

        default:
          return <Empty />;
      }
    }}
  </ConfigConsumer>
);

export type RenderEmptyHandler = typeof defaultRenderEmpty;

export default defaultRenderEmpty;
