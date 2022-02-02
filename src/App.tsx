import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { TodoItemType } from "./interfaces";
import TodoItem from "./TodoItem";

function App() {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //add Task
  const addTask = () => {
    if (inputValue.trim() !== "") {
      const task = {
        id: uuid(),
        text: inputValue,
        date: new Date().toLocaleString(),
        done: false,
      };
      setTodoList([...todoList, task]);
      setInputValue("");
    } else {
      alert("please enter text in inputField");
    }
  };
  //delete todo task
  const deleteTask = (id: string) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  // update task
  const updateTask = (id: string) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO APP</h1>
        <input
          className="App-taskInput"
          type="text"
          name="task"
          onChange={handleChange}
          value={inputValue}
        />
        <button className="App-Addbutton" onClick={addTask}>
          Add Task
        </button>
      </header>
      <main className="App-main">
        <ul className="App-ul">
          {todoList.map((task) => {
            return (
              <TodoItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            );
          })}
        </ul>
      </main>
      <footer className="App-footer">
        <h5>Born3am - 2022</h5>
      </footer>
    </div>
  );
}

export default App;
