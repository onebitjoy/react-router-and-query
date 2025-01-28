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

export function getTodos() {
  return data.todos;
}

export function getLimitedTodos(limit: number = 10) {
  const todos = getTodos();
  if (limit > todos.length) {
    return todos;
  }
  return todos.slice(0, limit);
}

export function getSingleTodo(todoId: number): Todo[] {
  return getTodos().filter((todo: Todo) => todo.id === todoId);
}

export function getFilterTodos(filters: Filters) {
  console.log("--------------------------");
  console.log(filters);

  if (!filters) {
    return getTodos();
  }

  let todos = getTodos();
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
