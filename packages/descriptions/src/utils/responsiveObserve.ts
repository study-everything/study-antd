export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Record<Breakpoint, string>;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>;

export const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

type SubscribeFunc = (screens: ScreenMap) => void;

interface MatchHandler {
  mql: MediaQueryList;
  listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null;
}

class ResponsiveObserve {
  /**
   * 订阅唯一 id | token
   *
   * @private
   * @memberof ResponsiveObserve
   */
  private subUid = -1;

  /**
   * 响应式断点列表
   *
   * @private
   * @type {ScreenMap}
   * @memberof ResponsiveObserve
   */
  private screens: ScreenMap = {};

  /**
   * 订阅者们
   *
   * @private
   * @memberof ResponsiveObserve
   */
  private subscribers = new Map<number, SubscribeFunc>();

  /**
   * 存放主从关系
   *
   * @private
   * @type {Record<string, MatchHandler>}
   * @memberof ResponsiveObserve
   */
  private matchHandlers: Record<string, MatchHandler> = {};

  // 触发通知订阅
  dispatch(pointMap: ScreenMap) {
    this.screens = pointMap;
    this.subscribers.forEach((func) => func(pointMap));
    return this.subscribers.size >= 1;
  }

  /**
   * 开始订阅
   *
   * @param {SubscribeFunc} func
   * @return {*}  {number}
   * @memberof ResponsiveObserve
   */
  subscribe(func: SubscribeFunc): number {
    if (this.subscribers.size === 0) {
      this.register();
    }
    this.subUid += 1;
    this.subscribers.set(this.subUid, func);
    func(this.screens);
    return this.subUid;
  }

  /**
   * 取消订阅
   *
   * @param {number} token
   * @memberof ResponsiveObserve
   */
  unsubscribe(token: number) {
    this.subscribers.delete(token);

    // 删除后为空，那就不需要再监听了
    if (this.subscribers.size === 0) {
      this.unregister();
    }
  }

  /**
   * 注册监听器
   *
   * @memberof ResponsiveObserve
   */
  register() {
    Object.keys(responsiveMap).forEach((breakpoint: Breakpoint) => {
      const matchMediaQuery = responsiveMap[breakpoint];
      const mql = window.matchMedia(matchMediaQuery);
      const listener = ({ matches }: Pick<MediaQueryListEvent, 'matches'>) => {
        this.dispatch({
          ...this.screens,
          [breakpoint]: matches,
        });
      };
      mql.addEventListener('change', listener);
      this.matchHandlers[matchMediaQuery] = {
        mql,
        listener,
      };
      listener(mql);
    });
  }

  /**
   * 取消注册
   *
   * @memberof ResponsiveObserve
   */
  unregister() {
    Object.keys(responsiveMap).forEach((breakpoint: Breakpoint) => {
      const matchMediaQuery = responsiveMap[breakpoint];
      const matchHandler = this.matchHandlers[matchMediaQuery];

      if (!matchHandler) {
        return;
      }

      const { mql, listener } = matchHandler;
      mql.removeEventListener('change', listener);
    });

    this.subscribers.clear();
  }
}

const responsiveObserve = new ResponsiveObserve();

export default responsiveObserve;
