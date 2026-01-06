import { ArrowLeft, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { Countdown } from '@/components/ui/Countdown';

interface TaskDetailsProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export const TaskDetails = ({ task, onEdit, onDelete, onBack }: TaskDetailsProps) => {
  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="pl-0 hover:bg-transparent hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to list
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <StatusBadge isCompleted={task.isCompleted} />
                <CategoryBadge category={task.category} />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">{task.title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" onClick={onEdit} icon={<Edit2 className="w-4 h-4" />}>Edit</Button>
              <Button variant="danger" onClick={onDelete} icon={<Trash2 className="w-4 h-4" />}>Delete</Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
            <div className="flex items-center font-medium text-slate-500">
              <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
              Due date: <span className="text-slate-900 ml-1">{new Date(task.dueDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-300">
              <Countdown deadline={task.dueDate} isCompleted={task.isCompleted} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Description</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{task.description}</p>
        </div>
      </div>
    </div>
  );
};
