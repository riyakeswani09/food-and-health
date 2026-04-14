import React from 'react';
import { Clock, CheckCircle2, Circle } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import type { Task } from '../../store/useTaskStore';
import { Badge } from '../../components/ui/Badge';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onStatusChange?: (id: string, newStatus: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onStatusChange }) => {
  const toggleSubtask = useTaskStore(s => s.toggleSubtask);

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'Urgent': return 'var(--danger)';
      case 'High': return 'var(--warning)';
      case 'Medium': return 'var(--info)';
      default: return 'var(--text-secondary)';
    }
  };

  const handleStatusCycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(!onStatusChange) return;
    if(task.status === 'To Do') onStatusChange(task.id, 'In Progress');
    else if(task.status === 'In Progress') onStatusChange(task.id, 'Done');
    else onStatusChange(task.id, 'To Do');
  }

  return (
    <div 
      className="glass-panel kitty-card-hover" 
      style={{ padding: '1.25rem', cursor: onClick ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', height: '100%' }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={handleStatusCycle} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }} aria-label="Toggle status">
            {task.status === 'Done' ? <CheckCircle2 size={20} color="var(--success)" /> : <Circle size={20} color="var(--text-secondary)" />}
          </button>
          <h3 style={{ fontWeight: '600', fontSize: '1.05rem', margin: 0, textDecoration: task.status === 'Done' ? 'line-through' : 'none', opacity: task.status === 'Done' ? 0.6 : 1 }}>
            {task.title}
          </h3>
        </div>
        <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
      </div>

      {task.description && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {task.description}
        </p>
      )}

      {task.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {task.tags.map(tag => (
            <Badge key={tag.id} color={tag.color}>{tag.name}</Badge>
          ))}
        </div>
      )}

      {task.subtasks.length > 0 && (
        <div style={{ marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {task.subtasks.map(st => (
            <div 
              key={st.id} 
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: st.completed ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: st.completed ? 'line-through' : 'none' }}
            >
              <button onClick={(e) => { e.stopPropagation(); toggleSubtask(task.id, st.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: '2px' }}>
                 {st.completed ? <CheckCircle2 size={16} color="var(--success)" /> : <Circle size={16} color="var(--text-secondary)" />}
              </button>
              <span style={{flex: 1}}>{st.title}</span>
            </div>
          ))}
        </div>
      )}

      {task.dueDate && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px dashed var(--border)' }}>
          <Clock size={14} />
          {format(new Date(task.dueDate), 'MMM d, yyyy')}
        </div>
      )}
    </div>
  );
};
