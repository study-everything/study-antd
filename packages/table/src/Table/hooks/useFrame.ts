import { useEffect, useRef, useState } from 'react';

export type Updater<State> = (prev: State) => State;
export function useLayoutState<State>(
  defaultState: State,
): [State, (updater: Updater<State>) => void] {
  const stateRef = useRef(defaultState);
  const [, forceUpdate] = useState({});

  const lastPromiseRef = useRef<Promise<void>>(null);
  const updateBatchRef = useRef<Updater<State>[]>([]);

  function setFrameState(updater: Updater<State>) {
    updateBatchRef.current.push(updater);

    const promise = Promise.resolve();
    lastPromiseRef.current = promise;

    promise.then(() => {
      if (lastPromiseRef.current === promise) {
        // 只执行最后一次
        const prevBatch = updateBatchRef.current;
        const prevState = stateRef.current;
        updateBatchRef.current = [];

        prevBatch.forEach(batchUpdater => {
          stateRef.current = batchUpdater(stateRef.current);
        });

        lastPromiseRef.current = null;

        if (prevState !== stateRef.current) {
          forceUpdate({});
        }
      }
    });
  }

  useEffect(
    () => () => {
      lastPromiseRef.current = null;
    },
    [],
  );

  return [stateRef.current, setFrameState];
}

export function useTimeoutLock<State>(defaultState): [(state: State) => void, () => State | null] {
  const frameRef = useRef(defaultState);
  const timeoutRef = useRef<number>();

  function cleanUp() {
    window.clearTimeout(timeoutRef.current);
  }

  function setState(newState) {
    frameRef.current = newState;
    cleanUp();

    timeoutRef.current = window.setTimeout(() => {
      frameRef.current = null;
      timeoutRef.current = undefined;
    }, 100);
  }

  function getState() {
    return frameRef.current;
  }

  useEffect(() => cleanUp, []);

  return [setState, getState];
}
