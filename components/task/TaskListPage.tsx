"use client";

import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

interface TaskListPageProps {
  tasks: Task[];
  onNavigate: (id: number) => void;
  onToggle: (id: number) => void;
  onCreate: () => void;
}

export const TaskListPage = ({ tasks, onNavigate, onToggle, onCreate }: TaskListPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'todo' | 'completed'>('all');

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t: Task) => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((t: Task) => {
        if (filter === 'todo') return !t.isCompleted;
        if (filter === 'completed') return t.isCompleted;
        return true;
      })
      .sort((a: Task, b: Task) => Number(a.isCompleted) - Number(b.isCompleted));
  }, [tasks, searchTerm, filter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Search & Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search assignments..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all outline-none text-slate-700 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex bg-slate-100 p-1 rounded-xl">
             {(['all', 'todo', 'completed'] as const).map((f) => (
               <button
                 key={f}
                 onClick={() => setFilter(f)}
                 className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                   filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 {f}
               </button>
             ))}
          </div>
          <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>
          <Button onClick={onCreate} icon={<Plus className="w-4 h-4" />}>New Task</Button>
        </div>
      </div>

      {/* Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task: Task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onClick={() => onNavigate(task.id)}
              onToggle={() => onToggle(task.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState onAction={onCreate} />
      )}
    </div>
  );
};
