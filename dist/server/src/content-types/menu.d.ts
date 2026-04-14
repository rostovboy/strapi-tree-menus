declare const _default: {
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
export default _default;
