import { Task } from '@/types/task';

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: "Calculus Midterm Prep",
    description: "Review Chapter 4 and 5, specifically integration techniques and area under curves. Practice problem set #3.",
    isCompleted: false,
    dueDate: "2023-11-15",
    category: 'Exam'
  },
  {
    id: 2,
    title: "History Essay Draft",
    description: "Write the first draft for the 'Industrial Revolution impact' essay. Minimum 1000 words.",
    isCompleted: true,
    dueDate: "2023-11-10",
    category: 'Assignment'
  },
  {
    id: 3,
    title: "Physics Lab Report",
    description: "Complete the data analysis for the pendulum experiment and submit via Canvas.",
    isCompleted: false,
    dueDate: "2023-11-20",
    category: 'Project'
  },
  {
    id: 4,
    title: "Read Hamlet Act 1",
    description: "Read scenes 1-3 and annotate key themes regarding madness and revenge.",
    isCompleted: false,
    dueDate: "2023-11-12",
    category: 'Reading'
  }
];
