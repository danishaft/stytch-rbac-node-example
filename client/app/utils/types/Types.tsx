interface SideBarChildType {
    title: string;
    href: string;
    disabled?: boolean;
}

export interface SideBarType {
    title: string;
    href?: string;
    icon?: React.ComponentType<any>; // Updated to accept any component type
    children?: SideBarChildType[];
    disabled?: boolean;
}