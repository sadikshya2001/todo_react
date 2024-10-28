import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !desc) {
      console.log("Title and description are required.");
      alert("Please fill in both title and description.");
      return;
    }
    
    console.log("Submitting task with title:", title, "and description:", desc);
    onSubmit(title, desc); 

    setTitle("");
    setDesc("");
  };

  return (
    <form onSubmit={handleOnSubmit} className='flex items-center justify-center mx-auto space-x-4 w-full'>
      <input 
        type='text'
        className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
        placeholder='Enter title here'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
        placeholder='Enter description here'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type='submit' className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>
        Add
      </button>
    </form>
  );
};

export default Form;
