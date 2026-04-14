import { Core, UID } from '@strapi/strapi';
declare const documentation: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getAttributesSpec(uid: UID.Schema, level?: number): Record<string, any>;
    getRelationAttributesSpec(uid: UID.Schema, level?: number, multiple?: boolean): {
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
    getRequiredAttributes(uid: UID.Schema): string[];
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
export type DocumentationService = ReturnType<typeof documentation>;
export default documentation;
