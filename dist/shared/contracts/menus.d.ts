import type { UniqueIdentifier } from '@dnd-kit/core';
import { Modules } from '@strapi/types';
import { UID } from '@strapi/strapi';
import { errors } from '@strapi/utils';
import type { Params } from '@strapi/types/dist/modules/documents';
import { Entity } from './entity';
export interface Menu extends Entity {
    title: string;
    slug: string;
    items: MenuItem[];
}
export interface MenuItem {
    id: UniqueIdentifier;
    title: string;
    url: string;
    target: string;
    isProtected: boolean;
    children: MenuItem[];
}
export type PaginatedResult<TSchemaUID extends UID.Schema, TParams extends Params.Pick<TSchemaUID, 'fields' | 'populate'> = never> = {
    data: Document[];
    meta: {
        pagination: Pagination;
        [key: string]: any;
    };
};
type PaginatedDocuments = PaginatedResult<UID.Schema>;
type SortQuery = Modules.Documents.Params.Sort.StringNotation<UID.Schema> & string;
type Document = Modules.Documents.Document<any>;
type AT_FIELDS = 'updatedAt' | 'createdAt' | 'publishedAt';
type BY_FIELDS = 'createdBy' | 'updatedBy' | 'publishedBy';
export type AvailableLocaleDocument = Pick<Document, 'id' | 'locale' | AT_FIELDS | 'status'>;
export type AvailableStatusDocument = Pick<Document, 'id' | 'documentId' | 'locale' | BY_FIELDS | AT_FIELDS>;
export type DocumentMetadata = {
    availableStatus: AvailableStatusDocument[];
    availableLocales: AvailableLocaleDocument[];
};
type Pagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
};
/**
 * GET /menus - Get one the menu
 */
export declare namespace GetMenu {
    interface Request {
        body: {};
        query: {};
    }
    interface Params {
        documentId: Modules.Documents.ID;
    }
    /**
     * TODO: this should follow the usual `data/error` pattern.
     */
    interface Response {
        data: Document;
        meta: DocumentMetadata;
        error?: errors.ApplicationError;
    }
}
/**
 * GET /menus - Get all the menu
 */
export declare namespace GetAllMenu {
    interface Request {
        body: {};
        query: {
            page?: string;
            pageSize?: string;
            sort?: SortQuery;
        };
    }
    interface Params {
    }
    /**
     * TODO: this should follow the usual `data/error` pattern.
     */
    interface Response extends PaginatedDocuments {
        error?: errors.ApplicationError;
    }
}
/**
 * POST /menus - Create a single menu
 */
export declare namespace CreateMenu {
    interface Request {
        query: {};
        body: Partial<Omit<Menu, keyof Entity>>;
    }
    /**
     * TODO: this should follow the usual `data/error` pattern.
     */
    type Response = {
        data: Document;
        meta: DocumentMetadata;
        error?: errors.ApplicationError;
    };
}
/**
 * PUT /menus/:id - Update a single menu
 */
export declare namespace UpdateMenu {
    interface Request {
        query: {};
        body: {
            data: Partial<Omit<Menu, keyof Entity>>;
        };
    }
    interface Params {
        id: Menu['documentId'];
    }
    /**
     * TODO: this should follow the usual `data/error` pattern.
     */
    type Response = {
        data: Document;
        meta: DocumentMetadata;
        error?: errors.ApplicationError;
    };
}
/**
 * DEL /menus/:id - Delete a single menu
 */
export declare namespace DeleteMenu {
    interface Request {
        query: {};
        body: {};
    }
    interface Params {
        id: Menu['documentId'];
    }
    /**
     * TODO: this should follow the usual `data/error` pattern.
     */
    type Response = {
        data: null;
        error: errors.ApplicationError;
    };
}
/**
 * BULK DEL /menus/bulk-delete - Delete a many menu
 */
export declare namespace BulkDeleteMenu {
    interface Request {
        query: {};
        body: {
            data: {
                ids: Menu['documentId'][];
                locale?: string | string[];
            };
        };
    }
    interface Params {
    }
    /**
     * TODO: this should follow the usual `data/error` pattern.
     */
    type Response = {
        data: null;
        error: errors.ApplicationError;
    };
}
export {};
