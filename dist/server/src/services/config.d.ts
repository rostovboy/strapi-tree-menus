import { Core } from '@strapi/strapi';
declare const config: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    get(): {
        default: {};
        validator(): void;
        fieldSchema: import("../../../shared/contracts/schema").FieldSchema;
    };
    schema(): Promise<{
        menu: import("@strapi/types/dist/struct").SchemaAttributes;
    }>;
};
export type ConfigService = ReturnType<typeof config>;
export default config;
