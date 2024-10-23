"use client";
import React, { useState } from 'react';
import Header from './components/header';
import Form from './components/form';
import TaskList from './components/TaskList';

const Page = () => {
  const [mainTask, setMainTask] = useState([]);

  
  const submitHandler = (title, desc) => {
    const newTask = {
      id: Math.random(),
      title,
      desc,
    };
    setMainTask([...mainTask, newTask]);
  };


  const deleteHandler = (id) => {
    const updatedTasks = mainTask.filter((task) => task.id !== id);
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
