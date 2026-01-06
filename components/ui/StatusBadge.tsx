import { CheckCircle2, Clock } from 'lucide-react';

export const StatusBadge = ({ isCompleted }: { isCompleted: boolean }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
    isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
  }`}>
    {isCompleted ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
    {isCompleted ? 'Completed' : 'To Do'}
  </span>
);
