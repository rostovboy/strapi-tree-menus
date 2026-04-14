/**
 * menu service
 */
import { Core } from '@strapi/strapi';
import { Params } from '../../../shared/contracts/entity';
import { Menu } from '../../../shared/contracts/menus';
declare const menu: ({ strapi, }: {
    strapi: Core.Strapi;
}) => {
    find: (ctx: any) => Promise<any>;
    findOne: (ctx: any) => Promise<any>;
    create: (ctx: any) => Promise<any>;
    update: (ctx: any, data: Menu) => Promise<any>;
    delete: (args: Params) => Promise<any>;
    deleteMany: (ids: string[], locale?: string) => Promise<number>;
} & Core.CoreAPI.Service.Base;
export type MenuService = ReturnType<typeof menu>;
export default menu;
