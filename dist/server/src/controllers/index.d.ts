/// <reference types="koa" />
declare const _default: {
    menu: ({ strapi, }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        configuration: (ctx: import("koa").Context) => Promise<void>;
        find: (ctx: import("koa").Context) => Promise<any>;
        findOne: (ctx: import("koa").Context) => Promise<any>;
        create: (ctx: import("koa").Context) => Promise<any>;
        update: (ctx: import("koa").Context) => Promise<any>;
        delete: (ctx: import("koa").Context) => Promise<any>;
        deleteMany: (ctx: any) => Promise<number>;
    } & import("@strapi/types/dist/core/core-api/controller").Base;
};
export default _default;
