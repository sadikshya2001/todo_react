import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createTodo = async (newTask) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);
  return response.data;
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
