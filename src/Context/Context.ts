import { createContext } from "react";
import { TodoItemType } from "../global/types";

interface TodoContextType {
  todoList: TodoItemType[];
  setTodoList: (todoList: TodoItemType[]) => void;
  
}

export const TodoContext = createContext<TodoContextType>({
  todoList: [],
  setTodoList: () => {},
});
