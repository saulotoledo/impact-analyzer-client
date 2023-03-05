/// <reference types="react-scripts" />

export type ResolveType<T> = (_value: T | PromiseLike<T>) => void;
export type RejectType = (_reason: Error) => void;
