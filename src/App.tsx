import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tabs from './components/Tabs';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

interface Task {
  id: string;
  text: string;
  status: 'todo' | 'done' | 'trash';
  isChecked: boolean; 
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'todo' | 'done' | 'trash'>('todo'); 

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now().toString(), text, status: 'todo', isChecked: false };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id: string, status: 'todo' | 'done' | 'trash') => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  const removeTask = (id: string) => updateTaskStatus(id, 'trash');
  const restoreTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: 'todo', isChecked: false } : task
      )
    );
  };
  
  const deletePermanently = (id: string) => setTasks(tasks.filter(task => task.id !== id));

  const toggleChecked = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (!task.isChecked) {
          return { ...task, isChecked: true, status: 'done' }; 
        } else {
          return { ...task, isChecked: false, status: 'todo' }; 
        }
      }
      return task;
    }));
  };


  const filteredTasks = tasks.filter(task => 
    task.status === activeTab || (task.status !== 'trash' && task.isChecked && activeTab === 'done')
  );

  const tabNames: Record<string, string> = {
    todo: 'To Do',
    done: 'Done',
    trash: 'Trash',
  };

  return (
    <div className="app">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
  
      <AddTask addTask={addTask} activeTab={'todo'} />
      <h2 className='tab-title'>{tabNames[activeTab]}</h2>
      <hr style={{ margin: '15px 0', border: '1px solid #ccc' }} />
      <TaskList 
        tasks={filteredTasks} 
        updateTaskStatus={updateTaskStatus} 
        removeTask={removeTask} 
        restoreTask={restoreTask}
        deletePermanently={deletePermanently}
        toggleChecked={toggleChecked}
      />
      <Footer />
    </div>
  );
};

export default App;
