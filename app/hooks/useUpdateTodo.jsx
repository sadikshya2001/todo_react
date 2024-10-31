import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '../core/http-config'; 

const updateTodo = async ({ id, updatedTask }) => {
  const response = await httpService.put(`/todos/${id}`, updatedTask); 
  return response.data;
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
