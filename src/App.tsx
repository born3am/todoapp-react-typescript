import { useState, ChangeEvent, useEffect } from 'react';

import './App.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Container, Input } from '@mui/material';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

import { warningAlert, successAlert } from './alerts';
import TodoItem from './components/TodoItem';
import { TodoItemType } from './global/types';
import 'animate.css';

function App() {
  const [todoList, setTodoList] = useState<TodoItemType[]>(JSON.parse(localStorage.getItem('todoList') || '[]'));
  const [inputValue, setInputValue] = useState<string>('');

  const todosLength = todoList.length;
  const hasTodos = todosLength > 0;
  const remainingTodos = todoList.filter((todo) => !todo.done).length || 0;

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //add Task
  const addTask = async () => {
    if (inputValue.trim() !== '') {
      const task = {
        id: uuid(),
        text: inputValue,
        date: new Date().toLocaleString(`en-US`, {
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
  //delete todo task
  const deleteTask = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      showClass: {
        popup: ' animate__animated animate__zoomIn',
      },
      hideClass: {
        popup: ' animate__animated animate__zoomOut',
      },
    });

    if (result.isConfirmed) {
      setTodoList(todoList.filter((task) => task.id !== id));
      await Swal.fire({
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

  //delete all Tasks
  const deleteAllTasks = async () => {
    if (todoList.map((task) => task.done).includes(true) || todoList.map((task) => task.done).includes(false)) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        showClass: {
          popup: ' animate__animated animate__zoomIn',
        },
        hideClass: {
          popup: ' animate__animated animate__zoomOut',
        },
      });

      if (result.isConfirmed) {
        setTodoList([]);
        await Swal.fire({
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
      await Swal.fire({
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

  //delete dones
  const deleteTasksdone = async () => {
    if (todoList.map((task) => task.done).includes(true)) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        showClass: {
          popup: ' animate__animated animate__zoomIn',
        },
        hideClass: {
          popup: ' animate__animated animate__zoomOut',
        },
      });

      if (result.isConfirmed) {
        setTodoList(todoList.filter((task) => !task.done));
        await Swal.fire({
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
      await Swal.fire({
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

  // update task
  const statusTask = (id: string) => {
    setTodoList(todoList.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='animate__animated animate__zoomInLeft'>TO-DO APP</h1>
        <div className='App-div-input'>
          <Input
            autoComplete='on'
            id='standard-basic'
            placeholder='Your task here!'
            type='text'
            name='task'
            onChange={handleChange}
            value={inputValue}
            onKeyDown={async (ev) => {
              if (ev.key === 'Enter') {
                await addTask();
              }
            }}
          />

          <Button
            size='medium'
            color='primary'
            variant='contained'
            startIcon={<AddCircleOutlineIcon />}
            onClick={addTask}
          >
            Add
          </Button>
        </div>
      </header>

      <Container maxWidth='sm'>
        <div
          style={{
            marginTop: '10px',
            padding: '5px',
          }}
        >
          <Button
            size='small'
            fullWidth
            variant='outlined'
            color='error'
            startIcon={<DeleteForeverIcon />}
            onClick={async () => deleteTasksdone()}
          >
            Delete Tasks Done
          </Button>
        </div>
        <div
          style={{
            padding: '5px',
          }}
        >
          <Button
            size='small'
            fullWidth
            variant='contained'
            color='error'
            startIcon={<DeleteForeverIcon />}
            onClick={async () => deleteAllTasks()}
          >
            Delete All Tasks
          </Button>
        </div>
        <main className='App-main'>
          <ul className='App-ul'>
            {todoList.map((task) => {
              return <TodoItem key={task.id} task={task} deleteTask={deleteTask} statusTask={statusTask} />;
            })}
            {hasTodos && (
              <p
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >{`${remainingTodos} of ${todosLength} task(s) remaining`}</p>
            )}
          </ul>
        </main>
        <footer className='App-footer'>
          <h5>
            <a href='https://github.com/born3am' rel='noreferrer' target='_blank'>
              Born3am - 2022
            </a>
          </h5>
        </footer>
      </Container>
    </div>
  );
}

export default App;
