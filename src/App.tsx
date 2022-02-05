import React, { useState, ChangeEvent, useEffect } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { TodoItemType } from "./interfaces";
import TodoItem from "./TodoItem";
import { Button, Container, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import { warningAlert, successAlert } from "./alerts";

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodoList(todoList.filter((task) => task.id !== id));
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Deleted!",
          text: "Task deleted",
          showConfirmButton: false,
          timer: 1000,
          toast: true,
        });
      }
    });
  };

  //delete all Tasks
  const deleteAllTasks = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodoList([]);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Deleted!",
          text: "All Tasks deleted",
          showConfirmButton: false,
          timer: 1000,
          toast: true,
        });
      }
    });
  };

  //delete dones
  const deleteTasksdone = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodoList(todoList.filter((task) => !task.done));
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Deleted!",
          text: "Task(s) done deleted",
          showConfirmButton: false,
          timer: 1000,
          toast: true,
        });
      }
    });
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
          </ul>
        </main>
        <footer className="App-footer">
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              marginTop: "100px",
            }}
          >
            <Button
              // sx={{ alignItem: "center" }}
              size="small"
              color="error"
              startIcon={<DeleteForeverIcon />}
              onClick={() => deleteTasksdone()}
            >
              Delete Tasks Done
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "left" }}>
            <Button
              // sx={{ alignItem: "center" }}
              size="small"
              color="error"
              startIcon={<DeleteForeverIcon />}
              onClick={() => deleteAllTasks()}
            >
              Delete All
            </Button>
          </div>
          <h5>Born3am - 2022</h5>
        </footer>
      </Container>
    </div>
  );
}

export default App;
