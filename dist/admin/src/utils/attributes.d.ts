import type { Schema as SchemaUtils } from '@strapi/types';
import { Component } from '../../../shared/contracts/components';
import { ContentType } from '../../../shared/contracts/content-types';
type ComponentsDictionary = Record<string, Component>;
type Schema = ContentType;
declare const checkIfAttributeIsDisplayable: (attribute: SchemaUtils.Attribute.AnyAttribute) => boolean;
interface MainField {
    name: string;
    type: SchemaUtils.Attribute.Kind | 'custom';
}
/**
 * @internal
 * @description given an attribute, content-type schemas & component schemas, find the mainField name & type.
 * If the attribute does not need a `mainField` then we return undefined. If we do not find the type
 * of the field, we assume it's a string #sensible-defaults
 */
declare const getMainField: (attribute: SchemaUtils.Attribute.AnyAttribute, mainFieldName: string | undefined, { schemas, components }: {
    schemas: Schema[];
    components: ComponentsDictionary;
}) => MainField | undefined;
export { checkIfAttributeIsDisplayable, getMainField };
export type { MainField };
