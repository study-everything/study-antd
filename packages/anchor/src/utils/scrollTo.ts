import raf from 'rc-util/lib/raf';
import { isWindow, getScroll } from './getScroll';

export function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return (cc / 2) * t * t * t + b;
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}

export default function scrollTo(y, options = {}) {
    const { getContainer = () => window, callback, duration = 450 } = options;
    const container = getContainer();
    const scrollTop = getScroll(container, true);
    const startTime = Date.now();

    const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
        if (isWindow(container)) {
            (container).scrollTo(window.pageXOffset, nextScrollTop);
        } else if (container instanceof Document || container.constructor.name === 'HTMLDocument') {
            (container).documentElement.scrollTop = nextScrollTop;
        } else {
            (container).scrollTop = nextScrollTop;
        }
        if (time < duration) {
            raf(frameFunc);
        } else if (typeof callback === 'function') {
            callback();
        }
    };
    raf(frameFunc);
}
