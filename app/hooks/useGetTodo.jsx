// useGetTodo.jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTodos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'); 
  return response.data;
};

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
};
