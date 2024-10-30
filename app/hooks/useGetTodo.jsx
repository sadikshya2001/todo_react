import { useQuery } from '@tanstack/react-query';
import httpService from '../core/http-config';

const fetchTodos = async () => {
  try {
    const response = await httpService.get('/todos?_limit=0');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 30000, 
    cacheTime: 3600000, 
    refetchOnWindowFocus: false, 
    retry: 1, 
  });
};