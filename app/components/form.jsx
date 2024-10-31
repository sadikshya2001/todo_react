import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !desc.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    try {
      await onSubmit(title.trim(), desc.trim());

      setTitle('');
      setDesc('');
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center mx-auto space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl p-4">
      <input
        type="text"
        className="w-full md:w-auto text-lg border-zinc-800 border-2 px-4 py-2 rounded"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        className="w-full md:w-auto text-lg border-zinc-800 border-2 px-4 py-2 rounded"
        placeholder="Enter description here"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <button 
        type="submit" 
        className="w-full md:w-auto bg-black hover:bg-gray-800 text-white px-6 py-2 text-lg font-semibold rounded transition duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default Form;