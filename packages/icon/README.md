# icon

## 安装依赖

```
$ pnpm --filter @study/style build
$ pnpm --filter @study/util build
```

用到的两个包colors和icons-svg

```
 pnpm add  @ant-design/colors --filter @study/icon

pnpm add   @ant-design/icons-svg --filter  @study/icon

```
## 打包

```
pnpm --filter @study/icon build

```


## 实现的基本功能

1. 基本用法

通过 @study/icon 引用 Icon 组件，不同主题的 Icon 组件名为图标名加主题做为后缀，也可以通过设置 spin 属性来实现动画旋转效果。

```
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from '@study/icons';
import { Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space>
    <HomeOutlined />
    <SettingFilled />
    <SmileOutlined />
    <SyncOutlined spin />
    <SmileOutlined rotate={180} />
    <LoadingOutlined />
  </Space>
);

export default App;
```

2. 多色图标

双色图标可以通过 twoToneColor 属性设置主题色。

```
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@study/icons';
import { Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space>
    <SmileTwoTone />
    <HeartTwoTone twoToneColor="#eb2f96" />
    <CheckCircleTwoTone twoToneColor="#52c41a" />
  </Space>
);

export default App;
```
3. 自定义图标

利用 Icon 组件封装一个可复用的自定义图标。可以通过 component 属性传入一个组件来渲染最终的图标，以满足特定的需求。

```
import Icon, { HomeOutlined } from @study/icons';
import type { CustomIconComponentProps } from '@study/icons/lib/components/Icon';
import { Space } from 'antd';
import React from 'react';

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HeartSvg} {...props} />
);


const App: React.FC = () => (
  <Space>
    <HeartIcon style={{ color: 'hotpink' }} />
    <Icon component={HomeOutlined as React.ForwardRefExoticComponent<any>} />
    <HomeOutlined />
  </Space>
);

export default App;
```

4. 使用 iconfont.cn

对于使用 iconfont.cn 的用户，通过设置 createFromIconfontCN 方法参数对象中的 scriptUrl 字段， 即可轻松地使用已有项目中的图标。

```
import { createFromIconfontCN } from '@study/icons';
import { Space } from 'antd';
import React from 'react';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const App: React.FC = () => (
  <Space>
    <IconFont type="icon-tuichu" />
    <IconFont type="icon-facebook" />
    <IconFont type="icon-twitter" />
  </Space>
);

export default App;

```
5. 使用 iconfont.cn 的多个资源

scriptUrl 可引用多个资源，用户可灵活的管理 iconfont.cn 图标。如果资源的图标出现重名，会按照数组顺序进行覆盖。

```
import { createFromIconfontCN } from '@study/icons';
import { Space } from 'antd';
import React from 'react';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});

const App: React.FC = () => (
  <Space>
    <IconFont type="icon-javascript" />
    <IconFont type="icon-java" />
    <IconFont type="icon-shoppingcart" />
    <IconFont type="icon-python" />
  </Space>
);

export default App;
```





















