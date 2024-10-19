export interface Task {
  id: string;
  title: string;
  description: string;
  startTime: number | null;
  endTime: number | null;
  costPerHour: number;
  totalTime: number;
  totalCost: number;
  labels: string[];
  priority: 'Low' | 'Medium' | 'High';
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  defaultHourlyRate: number;
  currency: string;
  theme: 'light' | 'dark';
}