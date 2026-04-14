import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import type { Status, Task } from '../../store/useTaskStore';
import { TaskCard } from './TaskCard';

interface ListViewProps {
  onEditTask: (task: Task) => void;
}

export const ListView: React.FC<ListViewProps> = ({ onEditTask }) => {
  const { tasks, searchQuery, moveTaskStatus } = useTaskStore();

  const filteredTasks = tasks.filter(t => {
    if(!searchQuery) return true;
    return t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           t.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const statuses: Status[] = ['To Do', 'In Progress', 'Done'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>
      {statuses.map(status => {
        const sectionTasks = filteredTasks.filter(t => t.status === status);
        if (sectionTasks.length === 0) return null;

        return (
          <div key={status} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
              {status} ({sectionTasks.length})
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {sectionTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onClick={() => onEditTask(task)}
                  onStatusChange={(id, newStatus) => moveTaskStatus(id, newStatus)}
                />
              ))}
            </div>
          </div>
        );
      })}
      
      {filteredTasks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                <p style={{ fontSize: '1.1rem' }}>No tasks found</p>
            </div>
      )}
    </div>
  );
};
