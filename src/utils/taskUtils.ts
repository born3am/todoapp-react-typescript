import { v4 as uuid } from 'uuid';

import { showAlert } from './alertUtils';
import { TodoItemType } from '../global/types';

export const addTask = async (
  inputValue: string,
  todoList: TodoItemType[],
  setTodoList: React.Dispatch<React.SetStateAction<TodoItemType[]>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  successAlert: () => Promise<void>,
  warningAlert: () => Promise<void>,
) => {
  if (inputValue.trim() !== '') {
    const task: TodoItemType = {
      id: uuid(),
      text: inputValue,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
      done: false,
    };
    setTodoList([...todoList, task]);
    setInputValue('');
    await successAlert();
  } else {
    await warningAlert();
  }
};

export const deleteTask = async (
  id: string,
  todoList: TodoItemType[],
  setTodoList: React.Dispatch<React.SetStateAction<TodoItemType[]>>,
) => {
  const result = await showAlert({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    showClass: {
      popup: 'animate__animated animate__zoomIn',
    },
    hideClass: {
      popup: 'animate__animated animate__zoomOut',
    },
  });

  if (result?.isConfirmed) {
    setTodoList(todoList.filter((task) => task.id !== id));
    await showAlert({
      position: 'top',
      icon: 'success',
      title: 'Deleted!',
      text: 'Task deleted',
      showConfirmButton: false,
      timer: 1000,
      toast: true,
    });
  }
};

export const deleteAllTasks = async (
  todoList: TodoItemType[],
  setTodoList: React.Dispatch<React.SetStateAction<TodoItemType[]>>,
) => {
  if (todoList.length > 0) {
    const result = await showAlert({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      showClass: {
        popup: 'animate__animated animate__zoomIn',
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut',
      },
    });

    if (result?.isConfirmed) {
      setTodoList([]);
      await showAlert({
        position: 'top',
        icon: 'success',
        title: 'Deleted!',
        text: 'All Tasks deleted',
        showConfirmButton: false,
        timer: 1000,
        toast: true,
      });
    }
  } else {
    await showAlert({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: 'Nothing to delete here!',
      showConfirmButton: false,
      timer: 1000,
      toast: true,
    });
  }
};

export const deleteTasksDone = async (
  todoList: TodoItemType[],
  setTodoList: React.Dispatch<React.SetStateAction<TodoItemType[]>>,
) => {
  if (todoList.some((task) => task.done)) {
    const result = await showAlert({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      showClass: {
        popup: 'animate__animated animate__zoomIn',
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut',
      },
    });

    if (result?.isConfirmed) {
      setTodoList(todoList.filter((task) => !task.done));
      await showAlert({
        position: 'top',
        icon: 'success',
        title: 'Deleted!',
        text: 'Task(s) done deleted',
        showConfirmButton: false,
        timer: 1000,
        toast: true,
      });
    }
  } else {
    await showAlert({
      position: 'top',
      icon: 'warning',
      title: 'Oops!',
      text: 'No tasks done yet!',
      showConfirmButton: false,
      timer: 1000,
      toast: true,
    });
  }
};
