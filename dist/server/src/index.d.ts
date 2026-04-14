/// <reference types="koa" />
declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
        fieldSchema: import("../../shared/contracts/schema").FieldSchema;
    };
    controllers: {
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
    routes: {
        admin: {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: string[];
                };
            }[];
        };
        'content-api': {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: any[];
                };
            }[];
        }; /**
         * Plugin server methods
         */
    };
    services: {
        menu: ({ strapi, }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            find: (ctx: any) => Promise<any>;
            findOne: (ctx: any) => Promise<any>;
            create: (ctx: any) => Promise<any>;
            update: (ctx: any, data: import("../../shared/contracts/menus").Menu) => Promise<any>;
            delete: (args: import("../../shared/contracts/entity").Params) => Promise<any>;
            deleteMany: (ids: string[], locale?: string) => Promise<number>;
        } & import("@strapi/types/dist/core/core-api/service").Base;
        documentation: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            getAttributesSpec(uid: import("@strapi/types/dist/uid").Schema, level?: number): Record<string, any>;
            getRelationAttributesSpec(uid: import("@strapi/types/dist/uid").Schema, level?: number, multiple?: boolean): {
                data: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                        };
                        attributes: {
                            type: string;
                            properties: Record<string, any>;
                        };
                    };
                } | {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            id: {
                                type: string;
                            };
                            attributes: {
                                type: string;
                                properties: Record<string, any>;
                            };
                        };
                    };
                };
            };
            getRequiredAttributes(uid: import("@strapi/types/dist/uid").Schema): string[];
            getTreeItemAttributesSpec(level?: number): any;
            overrides(): {
                tags: {
                    name: string;
                    description: string;
                }[];
                components: {
                    schemas: {
                        Menu: {
                            type: string;
                            properties: {
                                id: {
                                    type: string;
                                };
                                documentId: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                        Meta: {
                            type: string;
                            properties: {
                                pagination: {
                                    type: string;
                                    properties: {
                                        page: {
                                            type: string;
                                        };
                                        pageSize: {
                                            type: string;
                                        };
                                        pageCount: {
                                            type: string;
                                        };
                                        totalCount: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                        Response: {
                            type: string;
                            properties: {
                                data: {
                                    $ref: string;
                                };
                                meta: {
                                    type: string;
                                };
                            };
                        };
                        FindResponse: {
                            type: string;
                            properties: {
                                data: {
                                    type: string;
                                    items: {
                                        $ref: string;
                                    };
                                };
                                meta: {
                                    $ref: string;
                                };
                            };
                        };
                        Error: {
                            type: string;
                            properties: {
                                status: {
                                    type: string;
                                };
                                name: {
                                    type: string;
                                };
                                message: {
                                    type: string;
                                };
                                details: {
                                    type: string;
                                };
                            };
                        };
                        ErrorResponse: {
                            type: string;
                            properties: {
                                data: {
                                    type: string;
                                };
                                error: {
                                    type: string;
                                    items: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                        UpdateRequest: {
                            type: string;
                            properties: {
                                data: {
                                    $ref: string;
                                    locale: {
                                        type: string;
                                    };
                                    localizations: {
                                        type: string;
                                    };
                                };
                            };
                        };
                        BulkDeleteRequest: {
                            type: string;
                            properties: {
                                data: {
                                    type: string;
                                    properties: {
                                        ids: {
                                            type: string;
                                            required: boolean;
                                            items: {
                                                type: string;
                                            };
                                        };
                                        locale: {
                                            type: string;
                                            reuired: boolean;
                                            items: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                paths: {
                    '/tree-menus/menu': {
                        get: {
                            tags: string[];
                            parameters: import("openapi-types").OpenAPIV3.ParameterObject[];
                            summary: string;
                            operationId: string;
                            responses: {
                                '400': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '401': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '403': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '404': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '500': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '200': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        post: {
                            tags: string[];
                            parameters: any[];
                            summary: string;
                            operationId: string;
                            responses: {
                                '400': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '401': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '403': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '404': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '500': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '200': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    '/tree-menus/menu/{id}': {
                        get: {
                            tags: string[];
                            parameters: {
                                name: string;
                                in: string;
                                description: string;
                                deprecated: boolean;
                                required: boolean;
                                schema: {
                                    type: string;
                                };
                            }[];
                            summary: string;
                            operationId: string;
                            responses: {
                                '400': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '401': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '403': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '404': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '500': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '200': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        put: {
                            tags: string[];
                            parameters: {
                                name: string;
                                in: string;
                                description: string;
                                deprecated: boolean;
                                required: boolean;
                                schema: {
                                    type: string;
                                };
                            }[];
                            summary: string;
                            operationId: string;
                            requestBody: {
                                required: boolean;
                                content: {
                                    'application/json': {
                                        schema: {
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                            responses: {
                                '400': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '401': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '403': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '404': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '500': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '200': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        delete: {
                            tags: string[];
                            parameters: {
                                name: string;
                                in: string;
                                description: string;
                                deprecated: boolean;
                                required: boolean;
                                schema: {
                                    type: string;
                                };
                            }[];
                            summary: string;
                            operationId: string;
                            requestBody: {};
                            responses: {
                                '400': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '401': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '403': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '404': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '500': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '204': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    '/tree-menus/menu/bulk-delete': {
                        post: {
                            tags: string[];
                            parameters: any[];
                            summary: string;
                            operationId: string;
                            requestBody: {
                                required: boolean;
                                content: {
                                    'application/json': {
                                        schema: {
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                            responses: {
                                '400': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '401': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '403': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '404': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '500': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                                '204': {
                                    description: string;
                                    content: {
                                        'application/json': {
                                            schema: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        config: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            get(): {
                default: {};
                validator(): void;
                fieldSchema: import("../../shared/contracts/schema").FieldSchema;
            };
            schema(): Promise<{
                menu: import("@strapi/types/dist/struct").SchemaAttributes;
            }>;
        };
    };
    contentTypes: {
        menu: {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    name: string;
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    description: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    'content-manager': {
                        visible: boolean;
                    };
                    'content-type-builder': {
                        visible: boolean;
                    };
                    i18n: {
                        localized: boolean;
                    };
                };
                attributes: {
                    title: {
                        pluginOptions: {
                            i18n: {
                                localized: boolean;
                            };
                        };
                        type: string;
                        required: boolean;
                        maxLength: number;
                        configurable: boolean;
                    };
                    slug: {
                        pluginOptions: {
                            i18n: {
                                localized: boolean;
                            };
                        };
                        type: string;
                        targetField: string;
                        required: boolean;
                        configurable: boolean;
                    };
                    items: {
                        pluginOptions: {
                            i18n: {
                                localized: boolean;
                            };
                        };
                        type: string;
                        options: {
                            schemas: string;
                        };
                        required: boolean;
                        customField: string;
                    };
                };
            };
        };
    };
    policies: {};
    middlewares: {};
};
export default _default;
