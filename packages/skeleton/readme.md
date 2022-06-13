# skeleton 骨架屏组件

[classnames](https://www.npmjs.com/package/classnames)

```js
// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, {
    baz: null
}, ''); // => 'bar 1'
```

* 作用：在需要等待加载内容的位置提供一个占位图形组合。
* 使用场景：
  + 网络较慢，需要长时间等待加载处理的情况下。
  + 图文信息内容较多的列表/卡片中。
  + 只在第一次加载数据的时候使用。
  + 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。

基础组件ELement

```ts
export interface SkeletonElementProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'large' | 'small' | 'default' | number;
  shape?: 'circle' | 'square' | 'round';
  active?: boolean;
}
```

组件：avatar, title, paragraph, button, input, image

使用table布局，div元素不同宽高尺寸排列
