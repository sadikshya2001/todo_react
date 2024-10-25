import React from 'react';

const TaskItem = ({ task, deleteHandler, isFetchedTask }) => {
  return (
    <li className='flex items-center justify-between mb-8'>
      <div className='flex items-center justify-between mb-5 w-2/3'>
        <h5 className='text-xl font-semibold'>{task.title}</h5>
        <h6 className='text-lg font-medium'>{task.desc}</h6>
      </div>
      <button
        onClick={() => {
          console.log(`Deleting task with ID: ${task.id}, Fetched: ${isFetchedTask}`);
          deleteHandler(task.id, isFetchedTask);  
        }}
        className='bg-green-400 text-white px-4 py-2 rounded font-bold'>
        DONE
      </button>
    </li>
  );
};

export default TaskItem;
