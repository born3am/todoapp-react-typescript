import React, { useState, ChangeEvent, useEffect } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { TodoItemType } from "./interfaces";
import TodoItem from "./TodoItem";
import { Button, Container, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { warningAlert, successAlert, deleteAlert } from "./alerts";

function App() {
  const [todoList, setTodoList] = useState<TodoItemType[]>(
    JSON.parse(localStorage.getItem("todoList") || "[]")
  );
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

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
      successAlert();
    } else {
      warningAlert();
    }
  };
  //delete todo task
  const deleteTask = (id: string) => {
    setTodoList(todoList.filter((task) => task.id !== id));
    deleteAlert();
  };

  //delete all Tasks
  const deleteAllTasks = () => {
    setTodoList([]);
    deleteAlert();
  };

  //delete dones
  const deleteTasksdone = () => {
    setTodoList(todoList.filter((task) => !task.done));
    deleteAlert();
  };

  // update task
  const statusTask = (id: string) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="App">
      <Container fixed>
        <header className="App-header">
          <h1>TODO APP</h1>
          <div className="App-div-input">
            <TextField
              id="standard-basic"
              label="Enter your task here!"
              variant="standard"
              type="text"
              name="task"
              onChange={handleChange}
              value={inputValue}
            />
            <Button
              size="small"
              color="primary"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={addTask}
            >
              Add Task
            </Button>
          </div>
        </header>
        <main className="App-main">
          <ul className="App-ul">
            {todoList.map((task) => {
              return (
                <TodoItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  statusTask={statusTask}
                />
              );
            })}

            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                sx={{ alignItem: "center" }}
                size="small"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={() => deleteTasksdone()}
              >
                Delete Tasks Done
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                sx={{ alignItem: "center" }}
                size="small"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={() => deleteAllTasks()}
              >
                Delete All
              </Button>
            </div>
          </ul>
        </main>
        <footer className="App-footer">
          <h5>Born3am - 2022</h5>
        </footer>
      </Container>
    </div>
  );
}

export default App;
