import axios from 'axios';
import { Project, Task, User } from '../types';

const API_URL = 'https://google.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProjects = () => api.get<Project[]>('/projects');
export const fetchTasks = () => api.get<Task[]>('/tasks');
export const fetchUsers = () => api.get<User[]>('/users');

export const createProject = (project: Omit<Project, 'id'>) => api.post<Project>('/projects', project);
export const createTask = (task: Omit<Task, 'id'>) => api.post<Task>('/tasks', task);

export const updateTask = (taskId: number, updates: Partial<Task>) => api.patch<Task>(`/tasks/${taskId}`, updates);

export const deleteProject = (projectId: number) => api.delete(`/projects/${projectId}`);
export const deleteTask = (taskId: number) => api.delete(`/tasks/${taskId}`);

export default api;