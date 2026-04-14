import type { Store } from '@strapi/strapi/admin';
import { TypedUseSelectorHook } from 'react-redux';
type RootState = ReturnType<Store['getState']> & {
    ['content-manager']: any;
    ['tree-menus-config']: any;
};
declare const useTypedDispatch: <AppDispatch extends import("redux").Dispatch<import("redux").AnyAction> = import("redux").Dispatch<import("redux").AnyAction>>() => AppDispatch;
declare const useTypedSelector: TypedUseSelectorHook<RootState>;
export { useTypedSelector, useTypedDispatch };
