import { storiesOf } from '@storybook/react';
import  Statistic from './index';
import Countdown from './Countdown';
import './style'

storiesOf('Statistic', module).add('Demo', () => (
  <>
    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
    <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            suffix="%"
          />
    <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            suffix="%"
          />
      <Countdown title="Countdown" value={Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30} format="HH:mm:ss:SSS"/>
      <Countdown title="Day Level" value={Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30} format="D 天 H 时 m 分 s 秒" />
  </>	
))