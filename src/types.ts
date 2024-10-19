
export interface Project {
    id: number;
    name: string;
    description: string;
    tasks: number;
    progress: number;
  }
  
  export interface Task {
    id: number;
    title: string;
    description: string;
    projectId: number;
    status: 'To Do' | 'In Progress' | 'Completed';
    dueDate: string;
    assignedTo: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'member';
  }