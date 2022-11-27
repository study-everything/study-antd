import * as React from 'react';
import type { TagProps } from 'antd';
import { Tag } from 'antd';

export default function PickerTag(props: TagProps) {
  return <Tag color="blue" {...props} />;
}
