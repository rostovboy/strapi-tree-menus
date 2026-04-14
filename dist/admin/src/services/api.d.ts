import { CreateMenu, DeleteMenu, GetAllMenu, GetMenu, UpdateMenu } from '../../../shared/contracts/menus';
export declare const useGetMenuQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<GetMenu.Params & {
    params?: {} | undefined;
} & {
    [key: string]: any;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/strapi/admin").QueryArguments, unknown, import("@strapi/strapi/admin").BaseQueryError, {}, {}>, "TreeMenu", GetMenu.Response, "adminApi">>, useGetAllMenusQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<GetAllMenu.Params & {
    params?: {
        page?: string | undefined;
        pageSize?: string | undefined;
        sort?: string | undefined;
    } | undefined;
} & {
    [key: string]: any;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/strapi/admin").QueryArguments, unknown, import("@strapi/strapi/admin").BaseQueryError, {}, {}>, "TreeMenu", GetAllMenu.Response, "adminApi">>, useCreateTreeMenuMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<Partial<Omit<import("../../../shared/contracts/menus").Menu, keyof import("../../../shared/contracts/entity").Entity>>, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/strapi/admin").QueryArguments, unknown, import("@strapi/strapi/admin").BaseQueryError, {}, {}>, "TreeMenu", CreateMenu.Response, "adminApi">>, useUpdateTreeMenuMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    data: Partial<Omit<import("../../../shared/contracts/menus").Menu, keyof import("../../../shared/contracts/entity").Entity>>;
} & UpdateMenu.Params, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/strapi/admin").QueryArguments, unknown, import("@strapi/strapi/admin").BaseQueryError, {}, {}>, "TreeMenu", UpdateMenu.Response, "adminApi">>, useDeleteTreeMenuMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/strapi/admin").QueryArguments, unknown, import("@strapi/strapi/admin").BaseQueryError, {}, {}>, "TreeMenu", DeleteMenu.Response, "adminApi">>;
