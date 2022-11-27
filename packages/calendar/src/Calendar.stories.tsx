import React from 'react';
import { storiesOf } from '@storybook/react';
import type { BadgeProps } from 'antd';
import { Badge } from 'antd';
import { Calendar } from './index';
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';

import './style';

storiesOf('Calendar', module).add('何时使用', () => {
  const onChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  return (
    <div>
      <p>按照日历形式展示数据的容器。</p>
      <p>当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。</p>
    </div>
  );
});

storiesOf('Calendar', module).add('基本', () => {
  const onChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  return (
    <div>
      <p>按照日历形式展示数据的容器。</p>
      <h3>何时使用</h3>
      <p>当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。</p>

      <div style={{ width: 800, margin: 50 }}>
        <Calendar onChange={onChange} />
      </div>
      <h3>基本</h3>
      <p>一个通用的日历面板，支持年/月切换。</p>
    </div>
  );
});

storiesOf('Calendar', module).add('通知事项日历', () => {
  const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      <p>一个复杂的应用示例，用 dateCellRender 和 monthCellRender 函数来自定义需要渲染的数据。</p>
      <h3>何时使用</h3>

      <div style={{ width: 800, margin: 50 }}>
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
      </div>
    </div>
  );
});
