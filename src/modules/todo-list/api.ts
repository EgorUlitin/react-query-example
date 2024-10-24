export type TodoDto = {
  id: string;
  name: string;
  done: boolean;
};

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

const BASE_URL = "http://localhost:3000";

export const todoListApi = {
  getTodoList: (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    return fetch(`${BASE_URL}/tasks?_page=${page}`, {
      signal
    }).then(res => res.json() as Promise<PaginatedResult<TodoDto>>);
  }
};
