import React from 'react';

type AFC<P = Record<string, never>> = () => Promise<ReturnType<React.FC<P>>>;

export function asSyncComponent<T extends AFC<unknown>>(
  component: T
): React.FC<T extends AFC<infer P> ? P : never> {
  return component as any;
}
