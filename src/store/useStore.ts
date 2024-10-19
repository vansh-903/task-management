import {create} from 'zustand';
import { Project, Task } from '../types';

interface Store {
  projects: Project[];
  tasks: Task[];
  addProject: (project: Project) => void;
  addTask: (task: Task) => void;
  removeTask: (taskId: number) => void;
  updateTask: (taskId: number, updates: Partial<Task>) => void;
}

const useStore = create<Store>((set) => ({
  projects: [],
  tasks: [],
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (taskId) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== taskId) })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
}));

export default useStore;