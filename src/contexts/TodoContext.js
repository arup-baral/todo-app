/* eslint-disable no-unused-vars */
import { createContext } from "react";

const TodoContext = createContext({
  // todoList is an array of todo items
  // at each index, a todo object has to be stored
  todoList: [],

  addTodo: (task) => {},
  editTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  isTodoCompleted: (id) => {},
  clearTodo: () => {},
});

const TodoContextProvider = TodoContext.Provider;

export { TodoContext, TodoContextProvider };
