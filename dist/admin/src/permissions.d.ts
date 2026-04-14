export declare const PERMISSIONS: {
    main: ({
        id: number;
        action: string;
        actionParameters: {};
        subject: string;
        properties: {
            fields: string[];
            locales: string[];
        };
        conditions: never[];
    } | {
        id: number;
        action: string;
        actionParameters: {};
        subject: string;
        properties: {
            locales: string[];
            fields?: undefined;
        };
        conditions: never[];
    })[];
};
