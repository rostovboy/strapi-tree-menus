import * as yup from 'yup';
import { TreeItems } from '../../admin/src/types';
export declare const createYupSchema: (schemas: any[]) => yup.Schema<any>;
export declare const resetErrors: (items: TreeItems) => void;
export declare const addErrorsToFields: (errors: any, items: TreeItems) => TreeItems;
export declare const sanitizeItems: (items: TreeItems) => TreeItems;
export declare const requestDataYupSchema: () => yup.Schema<any>;
