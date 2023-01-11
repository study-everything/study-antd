import { createContext, useContext, useMemo } from 'react';

const EmptyList: string[] = [];

// Path register

export const PathRegisterContext = createContext(null);

export function useMeasure() {
  return useContext(PathRegisterContext);
}

// =========================== Path Tarcker ===========================
export const PathTrackerContext = createContext<string[]>(EmptyList);

// keypath
export function useFullPath(eventKey: string) {
  const parentKeyPath = useContext(PathTrackerContext);

  return useMemo(
    () => (eventKey !== undefined ? [...parentKeyPath, eventKey] : parentKeyPath),
    [parentKeyPath, eventKey],
  );
}

export const PathUserContext = createContext(null);
