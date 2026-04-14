import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useTaskStore } from '../../store/useTaskStore';
import type { Priority, Status, Tag, Task } from '../../store/useTaskStore';

interface TaskEditorProps {
  onClose: () => void;
  // If task is provided, we edit it. Otherwise, create new
  taskToEdit?: Task;
}

export const TaskEditor: React.FC<TaskEditorProps> = ({ onClose, taskToEdit }) => {
  const addTask = useTaskStore(s => s.addTask);
  const updateTask = useTaskStore(s => s.updateTask);

  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [priority, setPriority] = useState<Priority>(taskToEdit?.priority || 'Medium');
  const [status, setStatus] = useState<Status>(taskToEdit?.status || 'To Do');
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '');

  const defaultTags: Tag[] = [
    { id: '1', name: 'Study', color: 'var(--primary)' },
    { id: '2', name: 'Personal', color: 'var(--accent)' },
    { id: '3', name: 'Work', color: 'var(--warning)' },
  ];
  
  const [selectedTags, setSelectedTags] = useState<Tag[]>(taskToEdit?.tags || []);

  const toggleTag = (tag: Tag) => {
    if(selectedTags.find(t => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskToEdit) {
      updateTask(taskToEdit.id, {
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        tags: selectedTags
      });
    } else {
      addTask({
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        tags: selectedTags,
        subtasks: []
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Task Title *</label>
        <input 
          type="text" 
          className="input-base" 
          placeholder="What needs to be done?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          required
        />
      </div>

      <div>
         <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description</label>
         <textarea 
            className="input-base" 
            placeholder="Add details..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: 'vertical' }}
         />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Priority</label>
          <select className="input-base" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        
        <div style={{ flex: 1 }}>
           <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Status</label>
          <select className="input-base" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div>
         <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Due Date</label>
         <input 
          type="date" 
          className="input-base" 
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div>
         <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tags</label>
         <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
           {defaultTags.map(tag => {
             const isSelected = !!selectedTags.find(t => t.id === tag.id);
             return (
               <button 
                 type="button" 
                 key={tag.id}
                 onClick={() => toggleTag(tag)}
                 style={{
                   background: isSelected ? tag.color : 'transparent',
                   color: isSelected ? 'white' : 'var(--text-primary)',
                   border: `1px solid ${tag.color}`,
                   padding: '4px 12px',
                   borderRadius: '999px',
                   fontSize: '0.85rem',
                   cursor: 'pointer',
                   fontWeight: isSelected ? 'bold' : 'normal',
                   transition: 'all 0.2s'
                 }}
               >
                 {tag.name}
               </button>
             )
           })}
         </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', borderTop: '1px dashed var(--border)', paddingTop: '1.25rem' }}>
        <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
        <Button type="submit">{taskToEdit ? 'Save Changes' : 'Create Task'}</Button>
      </div>
    </form>
  )
};
