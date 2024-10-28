// useDeleteTodo.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const deleteTodo = async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
