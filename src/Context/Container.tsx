import React, { useState, useEffect } from "react";
import { TodoItemType } from "../global/types";
import { TodoContext } from "./Context";

interface Props {
  children: React.ReactChild;
}

export default function Container({ children }: Props) {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  useEffect(() => {
    console.log(localStorage.getItem("todoList"));
    let todo = JSON.parse(localStorage.getItem("todoList") as string);
    todo && setTodoList(todo);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <TodoContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoContext.Provider>
  );
}
