import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { TaskService, TaskResponseDto, TaskCreateDto, TaskUpdateDto } from '@/services/TaskService';

/**
 * Convert API response to local Task format
 */
function mapResponseToTask(dto: TaskResponseDto): Task {
  // Handle nullable deadline - preserve full ISO datetime for accurate countdown
  const dueDate = dto.deadlineUtc 
    ? dto.deadlineUtc
    : new Date().toISOString();
    
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description || '',
    isCompleted: dto.isCompleted,
    dueDate: dueDate,
    category: 'Assignment' // Default category since API doesn't provide it
  };
}

export const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // API: GET /api/Tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await TaskService.getAll();
      const mappedTasks = response.map(mapResponseToTask);
      setTasks(mappedTasks);
    } catch (err) {
      let errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
      
      // Check for specific backend authentication configuration error
      if (errorMessage.includes('No authenticationScheme was specified') || 
          errorMessage.includes('DefaultChallengeScheme')) {
        errorMessage = 'Backend authentication is not configured. Please configure Firebase authentication in your backend server.';
      }
      
      setError(errorMessage);
      console.error('Error fetching tasks:', errorMessage);
      // Don't throw error on initial load - just set empty tasks array
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // API: POST /api/Tasks
  const addTask = async (newTask: Omit<Task, 'id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const createDto: TaskCreateDto = {
        title: newTask.title.trim(),
        description: newTask.description?.trim() || null,
        deadlineUtc: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : null
      };
      
      const response = await TaskService.create(createDto);
      const task = mapResponseToTask(response);
      setTasks(prev => [task, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      console.error('Error creating task:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // API: PUT /api/Tasks/{id}
  const updateTask = async (id: number, updates: Partial<Task>) => {
    setIsLoading(true);
    setError(null);
    try {
      const currentTask = tasks.find(t => t.id === id);
      if (!currentTask) throw new Error('Task not found');

      const updatedTask = { ...currentTask, ...updates };
      const updateDto: TaskUpdateDto = {
        title: updatedTask.title.trim(),
        description: updatedTask.description?.trim() || null,
        isCompleted: updatedTask.isCompleted,
        deadlineUtc: updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString() : null
      };
      
      await TaskService.update(id, updateDto);
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      console.error('Error updating task:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // API: DELETE /api/Tasks/{id}
  const deleteTask = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await TaskService.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { tasks, isLoading, error, addTask, updateTask, deleteTask, fetchTasks };
};
