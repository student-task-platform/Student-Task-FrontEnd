export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string; // ISO datetime string (full UTC datetime)
  category: 'Assignment' | 'Exam' | 'Project' | 'Reading';
}
