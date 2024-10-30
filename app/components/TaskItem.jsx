import React from 'react';

const TaskItem = ({ task, onDelete, isFetchedTask }) => {
  if (!task || typeof task !== 'object') {
    return null;
  }

  const { id, title, desc } = task;

  const handleOnDelete = () => {
    if (id !== undefined) {
      onDelete(id, isFetchedTask);
    } 
  };

  return (
    <li className='bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-200'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex-1 min-w-0'>
          <h5 className='text-xl font-semibold text-gray-800 truncate mb-1'>
            {title || 'Untitled Task'}
          </h5>
          <p className='text-gray-600 text-sm'>
            {desc || 'No description provided'}
          </p>
        </div>
        <button
          onClick={handleOnDelete}
          className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg 
                   font-semibold transition-colors duration-200 flex-shrink-0
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          aria-label="Mark task as done"
        >
          DONE
        </button>
      </div>
    </li>
  );
};

export default TaskItem;