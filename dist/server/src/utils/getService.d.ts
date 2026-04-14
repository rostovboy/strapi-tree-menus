import { Core } from '@strapi/strapi';
import { Services } from '../services';
declare const getService: <TName extends keyof Services>(name: TName, { strapi }?: {
    strapi: Core.Strapi;
}) => Services[TName];
declare const getCMService: (name: string, { strapi }?: {
    strapi: Core.Strapi;
}) => Core.Service;
export { getService, getCMService };
