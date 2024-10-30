import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpService from '../core/http-config';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask) => {
      const response = await httpService.post('/todos', newTask);
      return response.data;
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries(['todos']);
      
      const previousTodos = queryClient.getQueryData(['todos']);
      
      const optimisticTask = {
        id: Date.now(), 
        title: newTask.title,
        desc: newTask.desc,
        completed: newTask.completed || false
      };
      
      queryClient.setQueryData(['todos'], (old = []) => {
        return [...old, optimisticTask];
      });

      return { previousTodos };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });
};