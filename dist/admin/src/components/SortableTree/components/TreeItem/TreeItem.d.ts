import React, { HTMLAttributes } from 'react';
export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
    childCount?: number;
    clone?: boolean;
    collapsed?: boolean;
    depth: number;
    disableInteraction?: boolean;
    disableSelection?: boolean;
    disabled?: boolean;
    ghost?: boolean;
    handleProps?: any;
    indicator?: boolean;
    indentationWidth: number;
    value: string;
    errors?: any;
    onCollapse?(): void;
    onRemove?(): void;
    onEdit?(): void;
    onAdd?(): void;
    wrapperRef?(node: HTMLLIElement): void;
}
export declare const TreeItem: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
