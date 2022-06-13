
# 初始下载后
## 1. 安装依赖

```bash
$ pnpm install
```

## 2. 执行 style、util 构建

```
$ pnpm run build --filter @study/style
$ pnpm run build --filter @study/util
```
## 3. 创建项目
### 创建 ts 项目

```base
$ npm run create:ts
```
### 创建 js 项目

```
$ npm run create:js
```

## 4. 如果遇到cannot resolve @study/util 或者 @study/style 这类的问题，在根目录下
```
$ pnpm -F @study/util build
$ pnpm -F @study/style build
```

## 5.开发进度
- [] Button按钮
- [] Icon图标
- [x] Typography排版
- [] Divider分割线
- [] Grid栅格
- [] Layout布局
- [] Space间距
- [] Affix固钉
- [] Breadcrumb面包屑
- [] Dropdown下拉菜单
- [] Menu导航菜单
- [] PageHeader页头
- [] Pagination分页
- [] Steps步骤条
- [] AutoComplete自动完成
- [] Cascader级联选择
- [] Checkbox多选框
- [] DatePicker日期选择框
- [] Form表单
- [] Input输入框
- [] InputNumber数字输入框
- [] Mentions提及
- [] Radio单选框
- [] Rate评分
- [] Select选择器
- [] Slider滑动输入条
- [x] Switch开关
- [] TimePicker时间选择框
- [] Transfer穿梭框
- [x] TreeSelect树选择
- [] Upload上传
- [x] Avatar头像
- [] Badge徽标数
- [] Calendar日历
- [] Card卡片
- [x] Carousel走马灯
- [] Collapse折叠面板
- [] Comment评论
- [] Descriptions描述列表
- [] Empty空状态
- [] Image图片
- [] List列表
- [] Popover气泡卡片
- [] Segmented分段控制器
- [] Statistic统计数值
- [] Table表格
- [] Tabs标签页
- [] Tag标签
- [] Timeline时间轴
- [] Tooltip文字提示
- [] Tree树形控件
- [] Alert警告提示
- [] Drawer抽屉
- [] Message全局提示
- [] Modal对话框
- [] Notification通知提醒框
- [x] Popconfirm气泡确认框
- [] Progress进度条
- [] Result结果
- [] Skeleton骨架屏
- [] Spin加载中
- [] Anchor锚点
- [] BackTop回到顶部
- [] ConfigProvider全局化配置
- [] Alert警告提示
- [] Breadcrumb面包屑 
