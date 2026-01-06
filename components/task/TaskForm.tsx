import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Task } from '@/types/task';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface TaskFormProps {
  onSubmit: (data: Omit<Task, 'id'>) => void;
  initialData?: Task | null;
  onCancel: () => void;
  isLoading?: boolean;
}

export const TaskForm = ({ onSubmit, initialData, onCancel, isLoading }: TaskFormProps) => {
  // Extract date and time from ISO string for form inputs
  const getDateValue = (isoString?: string) => {
    if (!isoString) return new Date().toISOString().split('T')[0];
    return isoString.split('T')[0];
  };

  const getTimeValue = (isoString?: string) => {
    if (!isoString) return '23:59';
    const time = isoString.split('T')[1];
    return time ? time.substring(0, 5) : '23:59'; // HH:MM format
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: getDateValue(initialData?.dueDate),
    dueTime: getTimeValue(initialData?.dueDate),
    category: initialData?.category || 'Assignment',
    isCompleted: initialData?.isCompleted || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Combine date and time into ISO string
    const dueDateTimeISO = `${formData.dueDate}T${formData.dueTime}:00.000Z`;
    onSubmit({
      ...formData,
      dueDate: dueDateTimeISO
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Task Title</label>
        <Input 
          required
          placeholder="e.g., Calculus Midterm Prep"
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Due Date</label>
            <Input 
            type="date"
            required
            value={formData.dueDate}
            onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Due Time</label>
            <Input 
            type="time"
            required
            value={formData.dueTime}
            onChange={e => setFormData({...formData, dueTime: e.target.value})}
            />
        </div>
      </div>

      <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
            <div className="relative">
                <select 
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-slate-700 appearance-none bg-white"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as Task['category']})}
                >
                    <option value="Assignment">Assignment</option>
                    <option value="Exam">Exam</option>
                    <option value="Project">Project</option>
                    <option value="Reading">Reading</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
        </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
        <textarea 
          required
          rows={3}
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-slate-700 placeholder:text-slate-400 resize-none"
          placeholder="What exactly do you need to do?"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <input 
            type="checkbox" 
            id="completed"
            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            checked={formData.isCompleted}
            onChange={e => setFormData({...formData, isCompleted: e.target.checked})}
        />
        <label htmlFor="completed" className="text-sm text-slate-700 select-none">Mark as completed</label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{initialData ? 'Save Changes' : 'Create Task'}</Button>
      </div>
    </form>
  );
};
