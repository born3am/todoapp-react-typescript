import { useState, useEffect, useMemo } from 'react';

import { TodoItemType } from '../global/types';

const useTasks = () => {
  const [todoList, setTodoList] = useState<TodoItemType[]>(() => JSON.parse(localStorage.getItem('todoList') || '[]'));
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const todosLength = useMemo(() => todoList.length, [todoList]);
  const hasTodos = useMemo(() => todosLength > 0, [todosLength]);
  const remainingTodos = useMemo(() => todoList.filter((todo) => !todo.done).length, [todoList]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const statusTask = (id: string) => {
    setTodoList((prevTodoList) => prevTodoList.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  return {
    todoList,
    inputValue,
    todosLength,
    hasTodos,
    remainingTodos,
    handleChange,
    statusTask,
    setTodoList,
    setInputValue,
  };
};

export { useTasks };
