import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { Play, Pause, Trash2 } from 'lucide-react';

export const TaskList: React.FC = () => {
  const { tasks, startTask, stopTask, deleteTask } = useTaskStore();

  const handleStartTask = (taskId: string) => {
    startTask(taskId);
  };

  const handleStopTask = (taskId: string) => {
    stopTask(taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const renderTaskItem = (task: Task) => {
    const isRunning = task.startTime && !task.endTime;
    const buttonClass = `px-3 py-1 rounded-md text-sm font-medium ${
      isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
    } text-white`;

    return (
      <li key={task.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => (isRunning ? handleStopTask(task.id) : handleStartTask(task.id))}
              className={buttonClass}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{task.description}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-indigo-600 dark:text-indigo-400">
            ${task.costPerHour.toFixed(2)}/hr
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Total time: {formatDistanceToNow(new Date(task.totalTime * 1000), { includeSeconds: true })}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {task.labels.map((label) => (
            <span
              key={label}
              className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {label}
            </span>
          ))}
        </div>
      </li>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No tasks yet. Create one to get started!</p>
      ) : (
        <ul>{tasks.map(renderTaskItem)}</ul>
      )}
    </div>
  );
};