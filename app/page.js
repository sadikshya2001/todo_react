// page.js
"use client";
import React, { useState } from 'react';
import Header from './components/header';
import Form from './components/form';
import TaskList from './components/TaskList';

const Page = () => {
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (title, desc) => {
    setMainTask([...mainTask, { title, desc }]);
  };

  const deleteHandler = (i) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedTasks);
  };

  return (
    <>
      <Header />
      <Form submitHandler={submitHandler} />
      <TaskList tasks={mainTask} deleteHandler={deleteHandler} />
    </>
  );
};

export default Page;
