import { CheckCircle2, Circle, Calendar } from 'lucide-react';
import { Task } from '@/types/task';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { Countdown } from '@/components/ui/Countdown';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onToggle: (e: React.MouseEvent) => void;
}

export const TaskCard = ({ task, onClick, onToggle }: TaskCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative bg-white p-5 rounded-2xl border transition-all duration-200 hover:shadow-lg cursor-pointer flex flex-col justify-between h-full ${
        task.isCompleted ? 'border-slate-200 opacity-75 hover:opacity-100' : 'border-slate-200 hover:border-indigo-300'
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <CategoryBadge category={task.category} />
          <button 
            onClick={(e) => { e.stopPropagation(); onToggle(e); }}
            className={`transition-colors duration-200 ${task.isCompleted ? 'text-emerald-500' : 'text-slate-300 hover:text-indigo-500'}`}
          >
            {task.isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
          </button>
        </div>
        
        <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${task.isCompleted ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-800'}`}>
          {task.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-3 mb-4">{task.description}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
        <div className="flex items-center text-xs font-medium text-slate-400">
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        <Countdown deadline={task.dueDate} isCompleted={task.isCompleted} />
      </div>
    </div>
  );
};
