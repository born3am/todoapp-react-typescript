import { useState, ChangeEvent, useEffect } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { TodoItemType } from "./global/types";
import TodoItem from "./components/TodoItem";
import { Button, Container, Input } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import { warningAlert, successAlert } from "./alerts";
import "animate.css";

function App() {
  const [todoList, setTodoList] = useState<TodoItemType[]>(
    JSON.parse(localStorage.getItem("todoList") || "[]")
  );
  const [inputValue, setInputValue] = useState<string>("");

  const todosLength = todoList.length;
  const hasTodos = todosLength > 0;
  const remainingTodos = todoList.filter((todo) => !todo.done).length || 0;

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
        date: new Date().toLocaleString(`en-US`, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
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
      showClass: {
        popup: " animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: " animate__animated animate__zoomOut",
      },
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
    if (
      todoList.map((task) => task.done).includes(true) ||
      todoList.map((task) => task.done).includes(false)
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        showClass: {
          popup: " animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: " animate__animated animate__zoomOut",
        },
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
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Oops...",
        text: "Nothing to delete here!",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
      });
    }
  };

  //delete dones
  const deleteTasksdone = () => {
    if (todoList.map((task) => task.done).includes(true)) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        showClass: {
          popup: " animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: " animate__animated animate__zoomOut",
        },
      }).then((result) => {
        console.log(todoList);
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
    } else {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "Oops!",
        text: "No tasks done yet!",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
      });
    }
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
      <header className="App-header">
        <h1 className="animate__animated animate__zoomInLeft">TO-DO APP</h1>
        <div className="App-div-input">
          <Input
            autoComplete="on"
            id="standard-basic"
            placeholder="Your task here!"
            type="text"
            name="task"
            onChange={handleChange}
            value={inputValue}
            onKeyPress={(ev) => {
              ev.key === "Enter" && addTask();
            }}
          />

          <Button
            size="medium"
            color="primary"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addTask}
          >
            Add
          </Button>
        </div>
      </header>

      <Container maxWidth="sm">
        <div
          style={{
            marginTop: "10px",
            padding: "5px",
          }}
        >
          <Button
            size="small"
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={() => deleteTasksdone()}
          >
            Delete Tasks Done
          </Button>
        </div>
        <div
          style={{
            padding: "5px",
          }}
        >
          <Button
            size="small"
            fullWidth
            variant="contained"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={() => deleteAllTasks()}
          >
            Delete All Tasks
          </Button>
        </div>
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
            {hasTodos && (
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >{`${remainingTodos} of ${todosLength} task(s) remaining`}</p>
            )}
          </ul>
        </main>
        <footer className="App-footer">
          <h5>
            <a
              href="https://github.com/born3am"
              rel="noreferrer"
              target="_blank"
            >
              Born3am - 2022
            </a>
          </h5>
        </footer>
      </Container>
    </div>
  );
}

export default App;
