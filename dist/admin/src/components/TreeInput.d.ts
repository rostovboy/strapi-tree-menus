import { type FieldValue, type InputProps } from '@strapi/strapi/admin';
import React from 'react';
type TreeInputProps = InputProps & FieldValue & {
    labelAction?: React.ReactNode;
    attribute: FieldAttribute;
};
export interface FieldAttribute {
    pluginOptions: PluginOptions;
    type: string;
    options: Options;
    customField: string;
}
export interface Options {
    schemas: string;
    [key: string]: any;
}
export interface FieldOptions {
    attribute: FieldAttribute;
    placeholder?: string;
    unique?: boolean;
    type?: string;
}
export interface PluginOptions {
    i18n: I18n;
}
export interface I18n {
    localized: boolean;
}
declare const TreeInput: React.ForwardRefExoticComponent<TreeInputProps & React.RefAttributes<HTMLButtonElement>>;
export { TreeInput };
