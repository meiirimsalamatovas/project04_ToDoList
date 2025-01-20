import React, { useState } from 'react';



interface AddTaskProps {

  addTask: (text: string, status: 'todo' | 'done' | 'trash') => void;

  activeTab: 'todo' | 'done' | 'trash';

}




const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      addTask(text.trim(), 'todo');
      setText('');
      setShowInput(false);
    }
  };

  return (
    <div className="add-task">
      <button className="plas-btn" onClick={() => setShowInput(!showInput)}>+</button>
      {showInput && (
        <div className="add-task-modal">
          <p>Add New To Do</p>
          <input 
            type="text" 
            placeholder="New task..." 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
          />
          <button className="add-task-modal-btn" onClick={handleAdd}>Add</button>
        </div>
      )}
    </div>
  );
};

export default AddTask;
