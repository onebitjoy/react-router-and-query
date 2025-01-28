import { data } from "./data";

// Type declarations
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low" | undefined;
  dueDate: string;
}

export interface Data {
  todos: Todo[];
}

export type Filters = {
  completed?: boolean | undefined;
  priority?: "High" | "Medium" | "Low" | undefined;
};

// Functions

export function getTodos({
  skip,
  limit,
}: {
  skip?: number | undefined;
  limit?: number | undefined;
}) {
  console.log({ skip, limit });
  const initialIndex: number = 0 + (skip !== undefined ? skip : 0);
  let L = limit || 10;
  if (limit === -1 || L > data.todos.length) {
    L = data.todos.length - 1;
  }
  const finalIndex: number =
    initialIndex + L > data.todos.length
      ? data.todos.length - 1
      : initialIndex + L;

  console.log({ initialIndex, finalIndex });
  return data.todos.slice(initialIndex, finalIndex);
}

export function getLimitedTodos(limit: number = 10) {
  const todos = getTodos({ skip: 0, limit: 10 });
  if (limit > todos.length) {
    return todos;
  }
  return todos.slice(0, limit);
}

export function getSingleTodo(todoId: number): Todo[] {
  return getTodos({ skip: 0, limit: -1 }).filter(
    (todo: Todo) => todo.id === todoId
  );
}

export function getFilterTodos(filters: Filters) {
  console.log("--------------------------");
  console.log(filters);

  if (!filters) {
    return getTodos({});
  }

  let todos = getTodos({});
  if (filters?.completed) {
    todos = todos.filter((todo: Todo) => {
      return todo.completed === filters.completed;
    });
  }
  if (filters?.priority) {
    todos = todos.filter((todo: Todo) => {
      return todo.priority === filters.priority;
    });
  }
  return todos;
}
