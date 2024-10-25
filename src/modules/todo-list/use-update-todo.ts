import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoDto, todoListApi } from "./api";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,
    onMutate: async newTodo => {
      const baseKey = [todoListApi.baseKey];

      await queryClient.cancelQueries({ queryKey: baseKey });

      const previousTodos = queryClient.getQueryData(baseKey);

      queryClient.setQueryData(baseKey, (old: TodoDto[]) =>
        old?.map((todo: TodoDto) =>
          todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
        )
      );

      return { previousTodos };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(baseKey, context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: baseKey });
    }
  });

  const handleUpdate = (id: string, done: boolean) => {
    updateTodoMutation.mutate({ id, done: !done });
  };

  return {
    handleUpdate: handleUpdate
  };
};
