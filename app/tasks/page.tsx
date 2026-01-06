import StudentTaskApp from '@/components/StudentTaskApp';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <StudentTaskApp />
    </ProtectedRoute>
  );
}
