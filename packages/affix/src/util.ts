import Affix from './'
import raf from 'rc-util/lib/raf';

export type Rect = ClientRect | DOMRect;

const TRIGGER_EVENTS = [
    'resize',
    'scroll',
    'load'
]

interface ClientRect {
    bottom: number;
    readonly height: number;
    left: number;
    right: number;
    top: number;
    readonly width: number;
}

export function getTargetRect(target: HTMLElement | Window | null | undefined): ClientRect {
    return target !== window
        ? (target as HTMLElement).getBoundingClientRect()
        : ({ top: 0, bottom: window.innerHeight } as ClientRect);
}

export function getFixedTop(
    placeholderReact: Rect,
    targetRect: Rect,
    offsetTop: number | undefined,
) {
    // console.log(targetRect.top, placeholderReact.top, offsetTop)
    if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
        return offsetTop + targetRect.top;
    }
    return undefined;
}

export function getFixedBottom(
    placeholderReact: Rect,
    targetRect: Rect,
    offsetBottom: number | undefined,
) {
    console.log(targetRect.bottom, placeholderReact.bottom, offsetBottom)
    if (offsetBottom !== undefined && targetRect.bottom < placeholderReact.bottom + offsetBottom) {
        const targetBottomOffset = window.innerHeight - targetRect.bottom;
        return offsetBottom + targetBottomOffset;
    }
    return undefined;
}

interface ObserverEntities {
    target: HTMLElement | Window;
    affixList: Affix[];
    eventHandlers: {
        [eventName: string]: any
    }
}
let observerEntities: ObserverEntities[] = [];

export function getObserverEntities() {
    return observerEntities
}

let entitiesListener = (entities: ObserverEntities) => {
    return () => {
        entities!.affixList.forEach((targetAffix: Affix) => {
            targetAffix.lazyUpdatePosition();
        })
    }
}

export function addObserveTarget(target: HTMLElement | Window | null, affix: Affix){
    if(!target) return

    let entities: ObserverEntities | undefined = observerEntities.find(item => item.target === target)
    if(entities) {
        entities.affixList.push(affix)
    }else{
        entities = {
            target,
            affixList: [affix],
            eventHandlers: {},
        };
        observerEntities.push(entities);

        TRIGGER_EVENTS.forEach(eventName => {
            entities!.eventHandlers[eventName] = target.addEventListener(eventName, entitiesListener(entities as ObserverEntities))
        })
    }
}

export function removeObserveTarget(affix: Affix): void {
    const observerEntity = observerEntities.find(oriObserverEntity => {
        const hasAffix = oriObserverEntity.affixList.some(item => item === affix);
        if (hasAffix) {
            oriObserverEntity.affixList = oriObserverEntity.affixList.filter(item => item !== affix);
        }
        return hasAffix;
    });

    if (observerEntity && observerEntity.affixList.length === 0) {
        observerEntities = observerEntities.filter(item => item !== observerEntity);

        TRIGGER_EVENTS.forEach(eventName => {
            observerEntity.target.removeEventListener(eventName, entitiesListener(observerEntity as ObserverEntities))
        });
    }
}

export function throttleByAnimationFrame(fn: (...args: any[]) => void) {
    let requestId: number | null;

    const later = (args: any[]) => () => {
        requestId = null;
        fn(...args);
    };

    const throttled = (...args: any[]) => {
        if (requestId == null) {
            requestId = raf(later(args));
        }
    };

    (throttled as any).cancel = () => raf.cancel(requestId!);

    return throttled;
}

export function throttleByAnimationFrameDecorator() {
    return function throttle(target: any, key: string, descriptor: any) {
        const fn = descriptor.value;
        let definingProperty = false;
        return {
            configurable: true,
            get() {
                if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
                    return fn;
                }

                const boundFn = throttleByAnimationFrame(fn.bind(this));
                definingProperty = true;
                Object.defineProperty(this, key, {
                    value: boundFn,
                    configurable: true,
                    writable: true,
                });
                definingProperty = false;
                return boundFn;
            },
        };
    };
}

