import { useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Container, Input } from '@mui/material';
import { warningAlert, successAlert } from './alerts';
import TodoItem from './components/TodoItem';
import { TodoItemType } from './global/types';
import 'animate.css';
import { addTask, deleteTask, deleteAllTasks, deleteTasksdone } from './utils/taskUtils';

function App() {
  const [todoList, setTodoList] = useState<TodoItemType[]>(JSON.parse(localStorage.getItem('todoList') || '[]'));
  const [inputValue, setInputValue] = useState<string>('');

  const todosLength = todoList.length;
  const hasTodos = todosLength > 0;
  const remainingTodos = todoList.filter((todo) => !todo.done).length || 0;

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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
                await addTask(inputValue, todoList, setTodoList, setInputValue, successAlert, warningAlert);
              }
            }}
          />

          <Button
            size='medium'
            color='primary'
            variant='contained'
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => addTask(inputValue, todoList, setTodoList, setInputValue, successAlert, warningAlert)}
          >
            Add
          </Button>
        </div>
      </header>

      <Container maxWidth='sm'>
        <div style={{ marginTop: '10px', padding: '5px' }}>
          <Button
            size='small'
            fullWidth
            variant='outlined'
            color='error'
            startIcon={<DeleteForeverIcon />}
            onClick={() => deleteTasksdone(todoList, setTodoList)}
          >
            Delete Tasks Done
          </Button>
        </div>
        <div style={{ padding: '5px' }}>
          <Button
            size='small'
            fullWidth
            variant='contained'
            color='error'
            startIcon={<DeleteForeverIcon />}
            onClick={() => deleteAllTasks(todoList, setTodoList)}
          >
            Delete All Tasks
          </Button>
        </div>
        <main className='App-main'>
          <ul className='App-ul'>
            {todoList.map((task) => (
              <TodoItem key={task.id} task={task} deleteTask={(id) => deleteTask(id, todoList, setTodoList)} statusTask={statusTask} />
            ))}
            {hasTodos && (
              <p style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {`${remainingTodos} of ${todosLength} task(s) remaining`}
              </p>
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