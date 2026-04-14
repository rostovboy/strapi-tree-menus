declare const _default: {
    register(app: any): void;
    registerTrads(app: any): Promise<{
        data: Record<string, string>;
        locale: string;
    }[]>;
};
export default _default;
