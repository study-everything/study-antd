import * as React from 'react';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';

export default function PickerButton(props: ButtonProps) {
  return <Button size="small" type="primary" {...props} />;
}
