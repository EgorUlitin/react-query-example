import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { todoListApi } from "./api";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    }
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));

    createTodoMutation.mutate({
      id: nanoid(),
      name,
      done: false,
      userId: "1"
    });

    e.currentTarget.reset();
  };

  return {
    handleCreate,
    isPanding: createTodoMutation.isPending
  };
};
