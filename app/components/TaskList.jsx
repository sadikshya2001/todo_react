// TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete }) => {
  return (
    <div className='p-8 bg-slate-200'>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => {
            const hasValidId = task && typeof task === 'object' && task.id !== undefined;

            if (!hasValidId) {
              task = {
                id: Date.now(),
                title: task?.title || 'Untitled Task', 
                desc: task?.desc || 'No description provided',
                completed: task?.completed || false
              };
            }

            return (
              <TaskItem 
                key={task.id} 
                task={task} 
                onDelete={onDelete} 
                isFetchedTask={'userId' in task} 
              />
            );
          })
        ) : (
          <h2>You have finished all the tasks!!</h2>
        )}
      </ul>
    </div>
  );
};

export default TaskList;