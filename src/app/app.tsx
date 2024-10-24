import { queryClient } from "../shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { TodoList } from "../modules/todo-list/todo-list";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import "./App.css";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
