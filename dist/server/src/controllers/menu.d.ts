/**
 * menu controller
 */
/// <reference types="koa" />
import { Core } from '@strapi/strapi';
declare const menu: ({ strapi, }: {
    strapi: Core.Strapi;
}) => {
    configuration: (ctx: import("koa").Context) => Promise<void>;
    find: (ctx: import("koa").Context) => Promise<any>;
    findOne: (ctx: import("koa").Context) => Promise<any>;
    create: (ctx: import("koa").Context) => Promise<any>;
    update: (ctx: import("koa").Context) => Promise<any>;
    delete: (ctx: import("koa").Context) => Promise<any>;
    deleteMany: (ctx: any) => Promise<number>;
} & Core.CoreAPI.Controller.Base;
export default menu;
