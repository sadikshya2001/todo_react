"use client";
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/header';
import Form from './components/form';
import TaskList from './components/TaskList';

import { useGetTodos } from './hooks/useGetTodo';
import { useCreateTodo } from './hooks/useCreateTodo';
import { useDeleteTodo } from './hooks/useDeleteTodo';

const queryClient = new QueryClient();

const Page = () => {
  const [localTasks, setLocalTasks] = useState([]);

  const { data: fetchedTasks = [], isLoading, error } = useGetTodos();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleOnSubmit = (title, desc) => {
    const newTask = {
      title,
      desc,
      completed: false,
    };

    createTodo(newTask);
  };

  const handleOnDelete = (id, isFetchedTask) => {
    if (isFetchedTask) {
      deleteTodo(id); 
    } else {
      setLocalTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); 
    }
  };

  const allTasks = [...fetchedTasks, ...localTasks];

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks.</div>;

  return (
    <>
      <Header />
      <Form onSubmit={handleOnSubmit} />
      <TaskList tasks={allTasks} onDelete={handleOnDelete} />
    </>
  );
};

export default function WrappedPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
}
