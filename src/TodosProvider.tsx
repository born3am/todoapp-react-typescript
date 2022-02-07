import React, { createContext, useState, FC } from "react";
import { TodoItemType } from "./global/types";

const contextDefaultValue: TodoItemType = {
    todoList: [],
    setTodoList:  () => {},
};

export const TodosContext =
  createContext<TodoItemType>(contextDefaultValue);

const TodosProvider: FC = ({ children }) => {
  const [todoList, setTodoList] = useState<string[]>(contextDefaultValue.todo);

  const addTodo = (newTodo: string) => setTodos((todos) => [...todos, newTodo]);

  return (
    <TodosContext.Provider
      value={{
        todoList,
        setTodoList: 

      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
