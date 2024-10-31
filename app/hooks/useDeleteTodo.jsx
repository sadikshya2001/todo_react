import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '../core/http-config'; 
const deleteTodo = async (id) => {
  await httpService.delete(`/todos/${id}`); 
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
