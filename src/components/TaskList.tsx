
import React, { useState } from 'react';

interface Task {
  id: string;
  text: string;
  status: 'todo' | 'done' | 'trash';
  isChecked: boolean;
}

interface TaskListProps {
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: 'todo' | 'done' | 'trash') => void;
  removeTask: (taskId: string) => void;
  restoreTask: (taskId: string) => void;
  deletePermanently: (taskId: string) => void;
  toggleChecked: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  removeTask,
  restoreTask,
  deletePermanently,
  toggleChecked
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (taskId: string) => {
    setActiveMenu((prev) => (prev === taskId ? null : taskId)); 
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <div className="task-content">
            <div className="task-menu-wrapper">
              <button
                className="menu-button"
                onClick={() => toggleMenu(task.id)}
                aria-label="Options"
              >
                ⋮
              </button>

              {/* Выпадающее меню */}
              {activeMenu === task.id && (
                <div className="menu-dropdown">
                  {task.status === 'trash' ? (
                    <>
                      <button onClick={() => restoreTask(task.id)}>
                        <i className="fas fa-arrow-left"></i> Move Back To To Do
                      </button>
                      <button onClick={() => deletePermanently(task.id)}>
                        <i className="fas fa-trash-alt"></i> Delete Forever
                      </button>
                    </>
                  ) : (
                    <button onClick={() => removeTask(task.id)}>
                      <i className="fas fa-trash"></i> Move to Trash
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Чекбокс и текст задачи */}
            <input
              className={`checkbox ${task.isChecked ? 'checked' : ''}`}
              type="checkbox"
              checked={task.isChecked}
              onChange={() => toggleChecked(task.id)} 
            />
            <span className={`task-text ${task.isChecked ? 'done' : ''}`}>
              {task.text}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;



