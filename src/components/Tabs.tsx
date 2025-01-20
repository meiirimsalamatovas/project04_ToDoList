import React from 'react';


interface TabsProps {

  activeTab: 'todo' | 'done' | 'trash';

  setActiveTab: React.Dispatch<React.SetStateAction<'todo' | 'done' | 'trash'>>;

}


const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button 
        className={activeTab === 'todo' ? 'active' : ''} 
        onClick={() => setActiveTab('todo')}
      >
        To Do
      </button>
      <button 
        className={activeTab === 'done' ? 'active' : ''} 
        onClick={() => setActiveTab('done')}
      >
        Done
      </button>
      <button 
        className={activeTab === 'trash' ? 'active' : ''} 
        onClick={() => setActiveTab('trash')}
      >
        Trash
      </button>
    </div>
  );
};

export default Tabs;
