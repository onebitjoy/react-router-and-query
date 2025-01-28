import { Request, Response } from "express";
const express = require("express");
import {
  getSingleTodo,
  getTodos,
  Filters,
  getFilterTodos,
  getLimitedTodos,
} from "./dataImporter";
import { parseBoolean, parsePriority } from "./parser";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/todos", (req: Request, res: Response) => {
  const queries = req.query;
  const filters: Filters = {
    completed: parseBoolean(queries.completed as string),
    priority: parsePriority(queries.priority as string),
  };
  if (filters.completed === undefined && filters.priority === undefined) {
    return res.send(getLimitedTodos());
  }
  res.send(getFilterTodos(filters));
});

app.get("/todos/:todoId", (req: Request, res: Response) => {
  const todoId: number = Number(req.params.todoId);
  if (todoId > getTodos().length) {
    return res.json({ todos: getSingleTodo(1) });
  }
  res.json({ todos: getSingleTodo(todoId) });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
