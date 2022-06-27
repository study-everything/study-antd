import * as React from 'react';
import type { IconBaseProps } from './Icon';
import Icon from './Icon';


export interface CustomIconOptions {
  scriptUrl?: string | string[];
  extraCommonProps?: { [key: string]: any }; // 给所有的 svg 图标 <Icon /> 组件设置额外的属性
}

export interface IconFontProps<T extends string = string> extends IconBaseProps {
  type: T;
}

const customCache = new Set<string>();
// 校验scriptUrl
function isValidCustomScriptUrl(scriptUrl: string): boolean {
  return Boolean(
    typeof scriptUrl === 'string'
    && scriptUrl.length
    && !customCache.has(scriptUrl)
  );
}


// 使用 iconfont.cn 通过设置 createScriptUrlElements 方法参数对象中的 scriptUrls 字段， 即可轻松地使用已有项目中的图标。
function createScriptUrlElements(scriptUrls: string[], index: number = 0): void {
  const currentScriptUrl = scriptUrls[index];
  if (isValidCustomScriptUrl(currentScriptUrl)) {
    const script = document.createElement('script');
    script.setAttribute('src', currentScriptUrl);
    script.setAttribute('data-namespace', currentScriptUrl);
    if (scriptUrls.length > index + 1) {
      // 如果不是最后
      script.onload = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      }
      script.onerror = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      };
    }
    customCache.add(currentScriptUrl);
    document.body.appendChild(script);
  }

}

export default function create<T extends string = string>(
  options: CustomIconOptions = {}
): React.FC<IconFontProps<T>> {
  const { scriptUrl, extraCommonProps = {} } = options;
  // 创建script标签  //把SVG Element元素插入document body
  if (scriptUrl &&
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function') {
      if (Array.isArray(scriptUrl)) {
          // 因为iconfont资源会把svg插入before，所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
          createScriptUrlElements(scriptUrl.reverse())
      }else{
          createScriptUrlElements([scriptUrl]);
      }
  }

  const Iconfont = React.forwardRef<HTMLSpanElement, IconFontProps<T>>((props, ref) => {
    const { type, children, ...restProps } = props;
        // children > type
    let content: React.ReactNode = null;
    if (props.type) {
      content = <use xlinkHref={`#${type}`} />;
    }
    if (children) {
      content = children;
    }

    return (
      <Icon {...extraCommonProps} {...restProps} ref={ref}>
        {content}
      </Icon>
    );
  })

  Iconfont.displayName = 'Iconfont';
  return Iconfont;
}