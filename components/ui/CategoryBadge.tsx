import { Task } from '@/types/task';

export const CategoryBadge = ({ category }: { category: Task['category'] }) => {
  const colors = {
    Assignment: 'bg-blue-100 text-blue-700',
    Exam: 'bg-purple-100 text-purple-700',
    Project: 'bg-orange-100 text-orange-700',
    Reading: 'bg-pink-100 text-pink-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${colors[category]}`}>
      {category}
    </span>
  );
};
