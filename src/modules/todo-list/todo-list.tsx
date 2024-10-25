import { useTodoList } from "./use-todo-list";
import { useCreateTodo } from "./use-create-todo";
import { useDeleteTodo } from "./use-delete-todo";
import { TodoDto } from "./api";
import { useUpdateTodo } from "./use-update-todo";

export const TodoList = () => {
  const { todoItems, isLoading, error } = useTodoList();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">Todo List!</h1>

      <form className="flex gap-2 mb-5" onSubmit={createTodo.handleCreate}>
        <input
          className="rounded p-2 border border-teal-500"
          type="text"
          name="name"
        />
        <button
          disabled={createTodo.isPanding}
          className="rounded p-2 border border-teal-500 disabled:opacity-50"
          type="submit"
        >
          Создать
        </button>
      </form>
      <div className="flex flex-col gap-4">
        {todoItems?.map((todo: TodoDto) => (
          <div
            className="flex border border-slate-300 rounded p-3 justify-between"
            key={todo.id}
          >
            {" "}
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => updateTodo.handleUpdate(todo.id, todo.done)}
            />{" "}
            {todo.name}
            <button
              disabled={deleteTodo.getIsPending(todo.id)}
              onClick={() => deleteTodo.handleDelete(todo.id)}
              className="text-rose-500 font-bold disabled:text-rose-300"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
