import { BookOpen, Plus } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({ onAction }: { onAction: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-dashed border-slate-200">
    <div className="bg-indigo-50 p-4 rounded-full mb-4">
      <BookOpen className="w-8 h-8 text-indigo-500" />
    </div>
    <h3 className="text-lg font-medium text-slate-900 mb-1">No tasks found</h3>
    <p className="text-slate-500 mb-6 max-w-xs">You&apos;re all caught up! Or maybe it&apos;s time to start planning your next assignment?</p>
    <Button onClick={onAction} icon={<Plus className="w-4 h-4" />}>Create New Task</Button>
  </div>
);
