import React from 'react';
import type { PaginationProps } from 'antd';
import { storiesOf } from '@storybook/react';
import { Pagination } from './Pagination';
import './style';

const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

storiesOf('Pagination', module)
  .add('basic', () => <Pagination defaultCurrent={1} total={50} />)
  .add('all', () => <Pagination total={85} showSizeChanger showQuickJumper showTotal={(total) => `Total ${total} items`} />)
  .add('mini', () => (
    <>
      <Pagination size="small" total={50} />
      <Pagination size="small" total={50} showSizeChanger showQuickJumper />
      <Pagination size="small" total={50} showTotal={showTotal} />
      <Pagination size="small" total={50} disabled showTotal={showTotal} showSizeChanger showQuickJumper />
    </>
  ));
