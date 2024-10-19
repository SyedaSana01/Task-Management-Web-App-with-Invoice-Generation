import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const Reports: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const generateReportData = () => {
    const now = new Date();
    const filteredTasks = tasks.filter((task) => {
      const taskDate = new Date(task.startTime || 0);
      switch (reportType) {
        case 'daily':
          return taskDate.toDateString() === now.toDateString();
        case 'weekly':
          const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
          return taskDate >= weekStart;
        case 'monthly':
          return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
      }
    });

    const groupedData = filteredTasks.reduce((acc, task) => {
      const label = task.labels[0] || 'Uncategorized';
      if (!acc[label]) {
        acc[label] = { totalTime: 0, totalCost: 0 };
      }
      acc[label].totalTime += task.totalTime;
      acc[label].totalCost += task.totalCost;
      return acc;
    }, {} as Record<string, { totalTime: number; totalCost: number }>);

    return Object.entries(groupedData).map(([label, data]) => ({
      label,
      totalTime: Number(data.totalTime.toFixed(2)),
      totalCost: Number(data.totalCost.toFixed(2)),
    }));
  };

  const reportData = generateReportData();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`, 14, 15);
    
    const tableData = reportData.map(item => [
      item.label,
      `${item.totalTime.toFixed(2)} hours`,
      `$${item.totalCost.toFixed(2)}`,
    ]);

    (doc as any).autoTable({
      head: [['Category', 'Total Time', 'Total Cost']],
      body: tableData,
      startY: 20,
    });

    doc.save(`${reportType}_report.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <div className="mb-4 flex justify-between items-center">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value as 'daily' | 'weekly' | 'monthly')}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate PDF
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="totalTime" name="Total Time (hours)" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="totalCost" name="Total Cost ($)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};