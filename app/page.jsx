"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/header';
import Form from './components/form';
import TaskList from './components/TaskList';

const Page = () => {
  const [fetchedTasks, setFetchedTasks] = useState([]);  
  const [localTasks, setLocalTasks] = useState([]);    


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setFetchedTasks(response.data.slice(0, 10)); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);


  const submitHandler = (title, desc) => {
    const newTask = {
      id: Math.random(), 
      title,
      desc,
      completed: false,  

    };
  

    setLocalTasks((prevTasks) => [...prevTasks, newTask]);
  };
  


  const deleteHandler = async (id, isFetchedTask) => {
    console.log(`Attempting to delete task with ID: ${id}, isFetchedTask: ${isFetchedTask}`);

    if (isFetchedTask) {

      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        console.log(`Deleted task from API with ID: ${id}`);
        setFetchedTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));  
      } catch (error) {
        console.error('Error deleting fetched task:', error);
      }
    } else {

      console.log(`Deleting local task with ID: ${id}`);
      setLocalTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));  
    }
  };

  const allTasks = [...fetchedTasks, ...localTasks];

  return (
    <>
      <Header />
      <Form submitHandler={submitHandler} />
      <TaskList tasks={allTasks} deleteHandler={deleteHandler} />
    </>
  );
};

export default Page;
