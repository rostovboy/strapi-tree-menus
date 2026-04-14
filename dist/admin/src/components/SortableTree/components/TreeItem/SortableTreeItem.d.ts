import type { UniqueIdentifier } from '@dnd-kit/core';
import { Props as TreeItemProps } from './TreeItem';
interface Props extends TreeItemProps {
    id: UniqueIdentifier;
    disabled?: boolean;
    errors?: any;
}
export declare function SortableTreeItem({ id, depth, disabled, errors, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
