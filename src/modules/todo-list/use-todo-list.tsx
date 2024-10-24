import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useTodoList = () => {
  const { data: todoItems, error, isLoading } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: result => result.toReversed()
  });

  //   const cursorRef = useIntersection(() => {
  //     fetchNextPage();
  //   });

  //   const cursor = (
  // <div className="flex gap-2 mt-4" ref={cursorRef}>
  //   {!hasNextPage && <div>Нет данных для загрузки</div>}
  //   {isFetchingNextPage && <div>...Loading</div>}
  // </div>
  //   );

  return {
    // cursor,
    todoItems,
    isLoading,
    error
  };
};
