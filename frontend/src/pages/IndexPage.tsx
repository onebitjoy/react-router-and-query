import { keepPreviousData, useQuery } from "@tanstack/react-query";
import getTodos from "../features/Todos/todoQuery";
import { useState } from "react";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
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

  const todos: Todo[] = data || ([] as Todo[]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-4xl mt-40">
        loading...
      </div>
    );

  // if the table ends
  if (todos?.length === 0)
    return (
      <h1 className="text-6xl bold text-center mt-16 text-red-400">
        The Table ended!
      </h1>
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

        <table className="border-collapse mt-10">
          <thead>
            <tr>
              <th className="p-2 border border-amber-50 ">Completed</th>
              <th className="p-2 border border-amber-50 ">Due Date</th>
              <th className="p-2 border border-amber-50 ">ID</th>
              <th className="p-2 border border-amber-50 ">Title</th>
              <th className="p-2 border border-amber-50 ">Description</th>
              <th className="p-2 border border-amber-50 ">Priority</th>
            </tr>
          </thead>

          <tbody>
            {todos.map(
              ({
                id,
                title,
                description,
                completed,
                priority,
                dueDate,
              }: Todo) => {
                return (
                  <tr key={id}>
                    <td className="p-2 text-balance border border-amber-50 ">
                      {completed.toString()}
                    </td>
                    <td className="p-2 text-balance border border-amber-50 ">
                      {dueDate}
                    </td>
                    <td className="p-2 text-balance border border-amber-50 ">
                      {id}
                    </td>
                    <td className="p-2 text-balance border border-amber-50 ">
                      {title}
                    </td>
                    <td className="p-2 text-balance border border-amber-50">
                      {description}
                    </td>
                    <td className="p-2 text-balance border border-amber-50 ">
                      {priority}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
