"use client";

import { useState, useEffect } from 'react';
import { useTaskStore } from '@/lib/hooks/useTaskStore';
import { Task } from '@/types/task';
import { TaskListPage } from '@/components/task/TaskListPage';
import { TaskDetails } from '@/components/task/TaskDetails';
import { TaskForm } from '@/components/task/TaskForm';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useToast } from '@/components/ui/ToastProvider';

export default function StudentTaskApp() {
  const { tasks, addTask, updateTask, deleteTask, isLoading, error } = useTaskStore();
  const { showToast } = useToast();

  // Show error toast when initial fetch fails
  useEffect(() => {
    if (error) {
      showToast({
        title: 'Error loading tasks',
        description: error,
        variant: 'error',
      });
    }
  }, [error, showToast]);
  
  // Simulated Router State
  const [view, setView] = useState<'list' | 'details'>('list');
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [taskToToggle, setTaskToToggle] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.taskId) {
        setActiveTaskId(event.state.taskId);
        setView('details');
      } else {
        setView('list');
        setActiveTaskId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // --- Router Actions ---
  const handleNavigate = (id: number) => {
    setActiveTaskId(id);
    setView('details');
    window.scrollTo(0,0);
    // Push state to browser history
    window.history.pushState({ taskId: id }, '', `#task-${id}`);
  };

  const handleBack = () => {
    setView('list');
    setActiveTaskId(null);
    // Go back in browser history
    window.history.back();
  };

  // --- CRUD Actions ---
  const handleToggle = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTaskToToggle(task);
      setIsToggleOpen(true);
    }
  };

  const handleToggleConfirm = async () => {
    if (taskToToggle) {
      try {
        await updateTask(taskToToggle.id, { isCompleted: !taskToToggle.isCompleted });
        setIsToggleOpen(false);
        setTaskToToggle(null);
        showToast({
          title: taskToToggle.isCompleted ? 'Task marked as incomplete' : 'Task completed',
          description: taskToToggle.isCompleted 
            ? 'Task has been marked as incomplete.' 
            : 'Great job! Task has been marked as complete.',
          variant: 'success',
        });
      } catch (err) {
        showToast({
          title: 'Failed to update task',
          description: err instanceof Error ? err.message : 'An error occurred',
          variant: 'error',
        });
      }
    }
  };

  const handleCreate = async (data: Omit<Task, 'id'>) => {
    try {
      await addTask(data);
      setIsFormOpen(false);
      showToast({
        title: 'Task created',
        description: 'Your task has been created successfully.',
        variant: 'success',
      });
    } catch (err) {
      showToast({
        title: 'Failed to create task',
        description: err instanceof Error ? err.message : 'An error occurred',
        variant: 'error',
      });
    }
  };

  const handleUpdate = async (data: Omit<Task, 'id'>) => {
    if (editingTask) {
      try {
        await updateTask(editingTask.id, data);
        setIsFormOpen(false);
        setEditingTask(null);
        showToast({
          title: 'Task updated',
          description: 'Your task has been updated successfully.',
          variant: 'success',
        });
      } catch (err) {
        showToast({
          title: 'Failed to update task',
          description: err instanceof Error ? err.message : 'An error occurred',
          variant: 'error',
        });
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (activeTaskId) {
      try {
        await deleteTask(activeTaskId);
        setIsDeleteOpen(false);
        handleBack();
        showToast({
          title: 'Task deleted',
          description: 'Your task has been deleted successfully.',
          variant: 'success',
        });
      } catch (err) {
        showToast({
          title: 'Failed to delete task',
          description: err instanceof Error ? err.message : 'An error occurred',
          variant: 'error',
        });
      }
    }
  };

  const activeTask = tasks.find(t => t.id === activeTaskId);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {view === 'list' && (
        <TaskListPage 
          tasks={tasks}
          onNavigate={handleNavigate}
          onToggle={handleToggle}
          onCreate={() => { setEditingTask(null); setIsFormOpen(true); }}
        />
      )}

      {view === 'details' && activeTask && (
        <TaskDetails 
          task={activeTask}
          onBack={handleBack}
          onEdit={() => { setEditingTask(activeTask); setIsFormOpen(true); }}
          onDelete={() => setIsDeleteOpen(true)}
        />
      )}

      {/* Modals */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm 
          initialData={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={() => setIsFormOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      <ConfirmDialog 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        isLoading={isLoading}
      />

      <ConfirmDialog 
        isOpen={isToggleOpen}
        onClose={() => {
          setIsToggleOpen(false);
          setTaskToToggle(null);
        }}
        onConfirm={handleToggleConfirm}
        title={taskToToggle?.isCompleted ? "Mark as Incomplete?" : "Mark as Complete?"}
        message={
          taskToToggle?.isCompleted 
            ? `Do you want to mark "${taskToToggle?.title}" as incomplete?` 
            : `Do you want to mark "${taskToToggle?.title}" as complete?`
        }
        confirmLabel="Yes"
        cancelLabel="No"
        variant="primary"
        isLoading={isLoading}
      />
    </main>
  );
}
