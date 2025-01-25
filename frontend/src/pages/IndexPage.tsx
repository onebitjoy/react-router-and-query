import { keepPreviousData, useQuery } from "@tanstack/react-query";
import getTodos from "../features/Todos/todoQuery";
import { useState } from "react";

export interface Todo {
  id: number;
  completed: boolean;
  todo: string;
  userId: number;
}

export default function IndexPage() {
  const [pageIndex, setPageIndex] = useState<number>(0);

  function handlePageNext() {
    setPageIndex((pageIndex) => pageIndex + 1);
  }

  function handlePagePrevious() {
    if (pageIndex === 0) {
      return;
    }
    setPageIndex((pageIndex) => pageIndex - 1);
  }
  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["todos", pageIndex],
    queryFn: () => getTodos(pageIndex),
    placeholderData: keepPreviousData,
  });

  console.log(data?.todos);
  const todos: Todo[] = data?.todos || ([] as Todo[]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-4xl mt-40">
        loading...
      </div>
    );
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <div>
          <button
            className="bg-amber-50 text-2xl text-slate-900 font-bold m-2 p-2 rounded-2xl"
            onClick={handlePagePrevious}
          >
            Previous Page
          </button>
          <button
            className="bg-amber-50 text-2xl text-slate-900 font-bold m-2 p-2 rounded-2xl"
            onClick={handlePageNext}
          >
            Next Page
          </button>
        </div>

        <table className="w-max border-collapse mt-10">
          <thead>
            <tr>
              <th className="p-2 border border-amber-50 ">ID</th>
              <th className="p-2 border border-amber-50 ">Todo</th>
              <th className="p-2 border border-amber-50 ">Completed</th>
              <th className="p-2 border border-amber-50 ">User ID</th>
            </tr>
          </thead>

          <tbody>
            {todos.map(({ id, completed, todo, userId }: Todo) => {
              return (
                <tr key={id}>
                  <td className="p-2 border border-amber-50 ">{id}</td>
                  <td className="p-2 border border-amber-50 ">
                    {completed.toString()}
                  </td>
                  <td className="p-2 border border-amber-50 ">{userId}</td>
                  <td className="p-2 border border-amber-50 ">{todo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
