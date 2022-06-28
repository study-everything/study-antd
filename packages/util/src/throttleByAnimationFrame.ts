import raf from 'rc-util/lib/raf'

export function throttleByAnimationFrame<T extends unknown[]>(fn: (...args: T) => void) {
  let requestId: number | null;

  const later = (args: T) => () => {
    requestId = null;
    fn(...args);
  }

  const throttled: {
    (...args: T): void;
    cancel: () => void;
  } = (...args: T) => {
    if (requestId == null) {
      requestId = raf(later(args))
    }
  }

  throttled.cancel = () => {
    raf.cancel(requestId)
    requestId = null
  }

  return throttled
}
