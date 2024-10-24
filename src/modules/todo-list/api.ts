import { infiniteQueryOptions } from "@tanstack/react-query";

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
  },

  //   getTodoListInfinityQueryOptions: ({ page }: { page: number }) => {
  //     return infiniteQueryOptions({
  //       queryKey: ["todos", { page }],
  //       queryFn: meta => todoListApi.getTodoList({ page }, meta),
  //     });
  //   }

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["todos"],
      queryFn: meta => todoListApi.getTodoList({ page: meta.pageParam }, meta),
      initialPageParam: 1,
      getNextPageParam: result => result.next,
      select: result => result.pages.flatMap(page => page.data)
    });
  }
};
