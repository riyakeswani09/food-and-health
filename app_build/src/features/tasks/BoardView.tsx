import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import type { Status, Task } from '../../store/useTaskStore';
import { TaskCard } from './TaskCard';

interface BoardViewProps {
  onEditTask: (task: Task) => void;
}

export const BoardView: React.FC<BoardViewProps> = ({ onEditTask }) => {
  const { tasks, searchQuery, moveTaskStatus } = useTaskStore();

  const statuses: Status[] = ['To Do', 'In Progress', 'Done'];

  const filteredTasks = tasks.filter(t => {
    if(!searchQuery) return true;
    return t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           t.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', gap: '1.5rem', height: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
      {statuses.map(status => {
        const columnTasks = filteredTasks.filter(t => t.status === status);
        
        return (
          <div key={status} style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem' }}>
              <h3 style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{status}</h3>
              <span style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }}>
                {columnTasks.length}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              {columnTasks.length === 0 ? (
                <div style={{ border: '2px dashed var(--border)', background: 'var(--glass-bg)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  No tasks here
                </div>
              ) : (
                columnTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onClick={() => onEditTask(task)}
                    onStatusChange={(id, newStatus) => moveTaskStatus(id, newStatus)}
                  />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  );
};
