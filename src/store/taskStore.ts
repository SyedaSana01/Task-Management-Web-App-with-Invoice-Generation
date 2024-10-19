import { create } from 'zustand';
import { Task } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  startTask: (taskId: string) => void;
  stopTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) })),
  startTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, startTime: Date.now() } : task
      ),
    })),
  stopTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === taskId && task.startTime) {
          const endTime = Date.now();
          const totalTime = (endTime - task.startTime) / 1000 / 3600; // in hours
          const totalCost = totalTime * task.costPerHour;
          return {
            ...task,
            endTime,
            totalTime: task.totalTime + totalTime,
            totalCost: task.totalCost + totalCost,
          };
        }
        return task;
      }),
    })),
}));