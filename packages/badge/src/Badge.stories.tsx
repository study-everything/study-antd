import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from 'antd';
import { Badge } from './Badge';
import './style';

storiesOf('Badge', module).add('Demo', () => (
  <>
    <Badge />
    <Badge.Ribbon text="Hippies">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
  </>
));
