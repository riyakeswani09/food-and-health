import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type Status = 'To Do' | 'In Progress' | 'Done';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  tags: Tag[];
  subtasks: Subtask[];
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTaskStatus: (id: string, newStatus: Status) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
}

const defaultTags: Tag[] = [
  { id: '1', name: 'Study', color: 'var(--primary)' },
  { id: '2', name: 'Personal', color: 'var(--accent)' },
  { id: '3', name: 'Work', color: 'var(--warning)' },
];

// Provide some cute sample data for first load
const sampleTasks: Task[] = [
  {
    id: 'sample-1',
    title: 'Feed the virtual kitty 🐾',
    description: 'First task is always the most important!',
    status: 'To Do',
    priority: 'Urgent',
    tags: [defaultTags[1]],
    subtasks: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Finish Physics Assignment',
    description: 'Chapter 4: Special Relativity',
    status: 'In Progress',
    priority: 'High',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    tags: [defaultTags[0]],
    subtasks: [
      { id: 'sub-1', title: 'Read textbook', completed: true },
      { id: 'sub-2', title: 'Do problems 1-10', completed: false }
    ],
    createdAt: new Date().toISOString(),
  }
];

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: sampleTasks,
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      addTask: (taskData) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...taskData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          }
        ]
      })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),
      moveTaskStatus: (id, newStatus) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
      })),
      toggleSubtask: (taskId, subtaskId) => set((state) => ({
        tasks: state.tasks.map(t => {
          if (t.id === taskId) {
            return {
              ...t,
              subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s)
            };
          }
          return t;
        })
      }))
    }),
    {
      name: 'kitty-todo-storage',
    }
  )
);
