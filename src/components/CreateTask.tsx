import React from 'react';
import { useForm } from 'react-hook-form';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';
import { PlusCircle } from 'lucide-react';

export const CreateTask: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Task>();
  const addTask = useTaskStore((state) => state.addTask);

  const onSubmit = (data: Task) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(),
      startTime: null,
      endTime: null,
      totalTime: 0,
      totalCost: 0,
      subtasks: [],
    };
    addTask(newTask);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
          ></textarea>
        </div>

        <div>
          <label htmlFor="costPerHour" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Cost per Hour ($)
          </label>
          <input
            type="number"
            id="costPerHour"
            {...register('costPerHour', { required: 'Cost per hour is required', min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.costPerHour && <p className="mt-1 text-sm text-red-600">{errors.costPerHour.message}</p>}
        </div>

        <div>
          <label htmlFor="labels" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Labels (comma-separated)
          </label>
          <input
            type="text"
            id="labels"
            {...register('labels', { 
              setValueAs: (v: string) => v.split(',').map(label => label.trim())
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            id="priority"
            {...register('priority')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create Task
        </button>
      </form>
    </div>
  );
};