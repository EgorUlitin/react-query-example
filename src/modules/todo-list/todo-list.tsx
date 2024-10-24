import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useState } from "react";
import { useIntersection } from "../../shared/hooks/useIntersection";

export const TodoList = () => {
  const [enabled, setEnabled] = useState();

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const {
    data: todoItems,
    error,
    isLoading,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: meta => todoListApi.getTodoList({ page: meta.pageParam }, meta),
    enabled: enabled,
    initialPageParam: 1,
    getNextPageParam: result => result.next,
    select: result => result.pages.flatMap(page => page.data)
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">Todo List!</h1>

      <div
        className={
          "flex flex-col gap-4" + (isPlaceholderData ? " opacity-50" : "")
        }
      >
        {todoItems?.map(todo => (
          <div className="border border-slate-300 rounded p-3" key={todo.id}>
            {todo.name}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4" ref={cursorRef}>
        {!hasNextPage && <div>Нет данных для загрузки</div>}
        {isFetchingNextPage && <div>...Loading</div>}
      </div>
    </div>
  );
};
