export function isWindow(obj: any) {
  return obj !== null && obj !== undefined && obj === obj.window;
}

export function getScroll(
  target: HTMLElement | Window | Document | null,
  top: boolean,
): number {
  if (typeof window === 'undefined') {
    return 0
  }
  let result = 0
  const method = top ? 'scrollTop' : 'scrollLeft'

  if (isWindow(target)) {
    result = (target as Window)[top ? 'scrollY' : 'scrollX']
  } else if (target instanceof Document) {
    result = target.documentElement[method]
  } else if (target) {
    result = (target as HTMLElement)[method]
  }

  if (target && !isWindow(target) && typeof result !== 'number') {
    result = ((target as HTMLElement).ownerDocument || (target as Document)).documentElement[method]
  }

  return result
}
