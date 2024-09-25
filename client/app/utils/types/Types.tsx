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


// ////////////////////////////////////////////////**
 
export interface Organization {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    members?: User[]
    createdAt: string;
    updatedAt: string;
}
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    organizationId: string;
    departmentId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Department {
    id: string;
    name: string;
    slug: string;
    description: string;
    organizationId: string;
    managerId: string;
    members: User[];
    createdAt: string;
    updatedAt: string;
} 
export interface DepartmentProject {
    id: string;
    name: string;
    description: string;
    departmentId: string;
    members: User[];
    createdAt: string;
    updatedAt: string;
}
export interface DepartmentProjectTask {
    id: string;
    title: string;
    description?: string;
    status: string;
    projectId: string;
    assignees: User[];
    createdAt: string;
    updatedAt: string;
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    status: string;
    organizationId: string;
    managerId: string;
    members: User[];
    createdAt: string;
    updatedAt: string;
  }
  
  interface ProjectTask {
    id: string;
    title: string;
    description?: string;
    status: string;
    projectId: string;
    assignees: User[];
    createdAt: string;
    updatedAt: string;
  }

//   responses
export interface OrgAndMemberResponse {
    message: string;
    newOrg: Organization;
    newUser: User;
}