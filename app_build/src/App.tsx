import { useState } from 'react';
import { DashboardLayout } from './features/dashboard/DashboardLayout';
import { BoardView } from './features/tasks/BoardView';
import { ListView } from './features/tasks/ListView';
import { TaskEditor } from './features/tasks/TaskEditor';
import { Modal } from './components/ui/Modal';
import type { Task } from './store/useTaskStore';

function App() {
  const [activeView, setActiveView] = useState<'board' | 'list'>('board');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const handleOpenNewTask = () => {
    setTaskToEdit(undefined);
    setIsEditorOpen(true);
  };

  const handleOpenEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsEditorOpen(true);
  };

  return (
    <>
      <DashboardLayout 
        activeView={activeView} 
        onViewChange={setActiveView}
        onAddTask={handleOpenNewTask}
      >
        {activeView === 'board' ? (
          <BoardView onEditTask={handleOpenEditTask} />
        ) : (
          <ListView onEditTask={handleOpenEditTask} />
        )}
      </DashboardLayout>

      <Modal 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)}
        title={taskToEdit ? "Edit Task" : "Create New Task"}
      >
        <TaskEditor 
          onClose={() => setIsEditorOpen(false)} 
          taskToEdit={taskToEdit} 
        />
      </Modal>
    </>
  );
}

export default App;
