import { BookOpen } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-indigo-100">
        <BookOpen size={24} strokeWidth={2.5} />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Task</h1>
      <p className="text-gray-500 text-sm mt-1">Organize your academic work</p>
    </div>
  );
}
