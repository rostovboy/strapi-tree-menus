import type { UniqueIdentifier } from '@dnd-kit/core';
import type { FlattenedItem, TreeItem, TreeItems } from '../../types';
export declare const iOS: boolean;
export declare function getProjection(items: FlattenedItem[], activeId: UniqueIdentifier, overId: UniqueIdentifier, dragOffset: number, indentationWidth: number): {
    depth: number;
    maxDepth: number;
    minDepth: number;
    parentId: UniqueIdentifier | null;
};
export declare function flattenTree(items: TreeItems): FlattenedItem[];
export declare function buildTree(flattenedItems: FlattenedItem[]): TreeItems;
export declare function findItem(items: TreeItem[], itemId: UniqueIdentifier): TreeItem | undefined;
export declare function findItemDeep(items: TreeItems, itemId: UniqueIdentifier): TreeItem | undefined;
export declare function removeItem(items: TreeItems, id: UniqueIdentifier): TreeItems;
export declare function setProperty<T extends keyof TreeItem>(items: TreeItems, id: UniqueIdentifier, property: T, setter: (value: TreeItem[T]) => TreeItem[T]): TreeItem[];
export declare function getChildCount(items: TreeItems, id: UniqueIdentifier): number;
export declare function removeChildrenOf(items: FlattenedItem[], ids: UniqueIdentifier[]): FlattenedItem[];
