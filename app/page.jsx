"use client";
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';

import Header from './components/header';
import Form from './components/form';
import TaskList from './components/TaskList';

import { useGetTodos } from './hooks/useGetTodo';
import { useCreateTodo } from './hooks/useCreateTodo';
import { useDeleteTodo } from './hooks/useDeleteTodo';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    },
  },
});

const Page = () => {
  const [localTasks, setLocalTasks] = useState([]);
  const queryClient = useQueryClient();

  const { data: fetchedTasks = [], isLoading, error } = useGetTodos();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  // Mark fetched tasks
  const markedFetchedTasks = fetchedTasks.map(task => ({
    ...task,
    isFromApi: true
  }));

  // Mark local tasks
  const markedLocalTasks = localTasks.map(task => ({
    ...task,
    isFromApi: false
  }));

  const allTasks = [...markedFetchedTasks, ...markedLocalTasks];

  const handleOnSubmit = (title, desc) => {
    const newTask = {
      id: Date.now(), 
      title,
      desc,
      completed: false,
    };
  
    setLocalTasks(prevTasks => [...prevTasks, newTask]);
    createTodo(newTask);
  };

  const handleOnDelete = (id) => {
    if (!id) return;

    const taskToDelete = allTasks.find(task => task.id === id);
    
    if (taskToDelete?.isFromApi) {
      deleteTodo(id, {
        onSuccess: () => {
          const currentData = queryClient.getQueryData(['todos']);
          queryClient.setQueryData(['todos'], currentData.filter(task => task.id !== id));

          queryClient.invalidateQueries(['todos']);
        }
      });
    } else {
      setLocalTasks(prevTasks => 
        prevTasks.filter(task => task.id !== id)
      );
    }
  };

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