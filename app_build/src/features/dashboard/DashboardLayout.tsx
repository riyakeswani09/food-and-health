import React from 'react';
import { Cat, Columns, ListOrdered, Settings, Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useTaskStore } from '../../store/useTaskStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeView: 'board' | 'list';
  onViewChange: (view: 'board' | 'list') => void;
  onAddTask: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeView, onViewChange, onAddTask }) => {
  const { searchQuery, setSearchQuery, tasks } = useTaskStore();
  const completedCount = tasks.filter(t => t.status === 'Done').length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '1.5rem', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'var(--primary-light)', padding: '0.5rem', borderRadius: '12px', color: 'var(--primary)' }}>
            <Cat size={28} />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.5px' }}>Kitty Tasks</h1>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <Button 
            variant={activeView === 'board' ? 'primary' : 'ghost'} 
            onClick={() => onViewChange('board')}
            style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}
          >
            <Columns size={18} /> Board View
          </Button>
          <Button 
            variant={activeView === 'list' ? 'primary' : 'ghost'} 
            onClick={() => onViewChange('list')}
            style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}
          >
            <ListOrdered size={18} /> List View
          </Button>
        </nav>

        {/* Mini progress */}
        <div className="glass-panel" style={{ padding: '1.25rem', marginTop: 'auto', background: 'var(--bg-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>Daily Purr-ogress</span>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius: '4px', transition: 'width 0.4s ease-out' }}></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', borderBottom: '1px solid var(--glass-border)', zIndex: 10 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', width: '320px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search by title, description..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base"
              style={{ paddingLeft: '2.8rem', borderRadius: 'var(--radius-full)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button variant="ghost" size="icon" style={{ borderRadius: '50%' }}><Settings size={20} /></Button>
            <Button onClick={onAddTask} style={{ borderRadius: 'var(--radius-full)' }}>
              <Plus size={18} /> New Task
            </Button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem' }}>
          {children}
        </div>
      </main>
    </div>
  );
};
