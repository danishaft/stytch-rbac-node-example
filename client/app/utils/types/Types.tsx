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

export interface TaskDataType {
    taskId: string;
    title: string;
    status: 'todo' | 'in-progress' | 'completed';
    assignee?: string;
}

export interface ProjectDataType {
    projectId: string ;
    name: string;
    lead: string;
    tasks: TaskDataType[];
    description: string;
    type: 'Public' | 'Private';
}

export interface DepartmentDataType {
    departmentId: string;
    identifier: string;
    name: string;
    projects: ProjectDataType[];
    description: string;
}