import './App.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Container, Input } from '@mui/material';

import TodoItem from './components/TodoItem';
import { useTasks } from './hooks/useTasks';
import 'animate.css';
import { warningAlert, successAlert } from './utils/alertUtils';
import { addTask, deleteTask, deleteAllTasks, deleteTasksDone } from './utils/taskUtils';

const App: React.FC = () => {
  const {
    todoList,
    inputValue,
    todosLength,
    hasTodos,
    remainingTodos,
    handleChange,
    statusTask,
    setTodoList,
    setInputValue,
  } = useTasks();

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='App-header-content'>
          <img
            className='animate__animated  animate__delay-2s animate__pulse animate__infinite'
            src='/todo-logo-192x192.png'
            alt='To-Do App Logo'
          />
          <h1 className='animate__animated animate__zoomInLeft'>TO-DO APP</h1>
        </div>
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
            onClick={async () => addTask(inputValue, todoList, setTodoList, setInputValue, successAlert, warningAlert)}
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
            onClick={async () => deleteTasksDone(todoList, setTodoList)}
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
            onClick={async () => deleteAllTasks(todoList, setTodoList)}
          >
            Delete All Tasks
          </Button>
        </div>
        <main className='App-main'>
          <ul className='App-ul'>
            {todoList.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                deleteTask={async (id) => deleteTask(id, todoList, setTodoList)}
                statusTask={statusTask}
              />
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
};

export default App;
