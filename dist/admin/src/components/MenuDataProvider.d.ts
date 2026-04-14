import { UniqueIdentifier } from '@dnd-kit/core';
import { FormikErrors } from 'formik/dist/types';
import React, { Dispatch, SetStateAction } from 'react';
import { FieldSchema } from '../../../shared/contracts/schema';
import { FlattenedItem, TreeItems } from '../types';
interface MenuDataProviderProps {
    name: string;
    value: TreeItems;
    schema: FieldSchema;
    children: any;
    onChange: (eventOrPath: React.ChangeEvent<any> | string, value?: any) => void;
    disabled?: boolean;
    error?: string;
}
export interface MenuDataContextProps {
    name: string;
    value: TreeItems;
    items: TreeItems;
    setItems: Dispatch<SetStateAction<TreeItems>>;
    schema: FieldSchema;
    activeItem: FlattenedItem | undefined;
    setActiveItem: Dispatch<SetStateAction<FlattenedItem | undefined>>;
    onChange: (value: TreeItems) => void;
    disabled?: boolean;
    error?: string;
    validate: (value: any) => any;
    flattenedItems: FlattenedItem[];
    activeId?: UniqueIdentifier | null;
    setActiveId: Dispatch<SetStateAction<UniqueIdentifier | undefined>>;
    errors?: FormikErrors<any>;
    setErrors: Dispatch<SetStateAction<FormikErrors<any>>>;
}
declare const MenuDataContext: React.Context<MenuDataContextProps>;
declare const MenuDataProvider: ({ children, value, onChange, name, schema, disabled, error }: MenuDataProviderProps) => import("react/jsx-runtime").JSX.Element;
export { MenuDataContext };
export default MenuDataProvider;
