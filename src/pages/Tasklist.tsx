import React, { useState, useEffect } from 'react';
import { CheckSquare, Clock, AlertCircle, Plus, Trash2, Check } from 'lucide-react';
import useStore from '../store/useStore';
import { initializeSocket, subscribeToUpdates, emitTaskUpdate } from '../services/socket';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const { tasks, addTask, removeTask, updateTask } = useStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    initializeSocket();
    subscribeToUpdates((update) => {
      if (update.type === 'TASK_UPDATE') {
        updateTask(update.data.id, update.data);
      }
    });
  }, []);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        description: '',
        projectId: 1,
        status: 'To Do',
        dueDate: new Date().toISOString().split('T')[0],
        assignedTo: '',
      };
      addTask(newTask);
      emitTaskUpdate(newTask);
      setNewTaskTitle('');
    }
  };

  const handleRemoveTask = (taskId: number) => {
    removeTask(taskId);
    emitTaskUpdate({id: taskId, deleted: true} as Task);
  };

  const handleCompleteTask = (task: Task) => {
    const updatedTask = { ...task, status: 'Completed' };
    updateTask(task.id, updatedTask);
    emitTaskUpdate(updatedTask);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckSquare className="h-5 w-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tasks</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
          className="flex-grow px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="mr-2" /> Add Task
        </button>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{task.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(task.status)}
                    <span className="ml-2 text-sm text-gray-500">{task.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {task.status !== 'Completed' && (
                      <button
                        onClick={() => handleCompleteTask(task)}
                        className="text-green-600 hover:text-green-900"
                        title="Complete Task"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveTask(task.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Remove Task"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;