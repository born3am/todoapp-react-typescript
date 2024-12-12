import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
import { Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import moment from 'moment';
import { TodoItemType } from '../global/types';
import './TodoItem.css';
import 'animate.css';

type Props = {
  deleteTask: (id: string) => void;
  statusTask: (id: string) => void;
  task: TodoItemType;
};

export default function TodoItem({ task, deleteTask, statusTask }: Props) {
  const matches = useMediaQuery('(min-width:600px)');
  const formattedDate = moment(task.date).fromNow();

  return (
    <li className={`TodoItem-li ${task.done ? 'TodoItem-li-done' : 'TodoItem-li-undone'}`}>
      <div>
        <Button onClick={() => statusTask(task.id)}>
          {task.done ? <CheckCircleOutlineIcon color='disabled' /> : <RadioButtonUncheckedTwoToneIcon color='action' />}
        </Button>
        <span className={`Task ${task.done ? 'Task-done' : 'Task-undone'}`}>{task.text}</span>
      </div>
      {matches && (
        <div>
          <span className='TodoItem-date'>{`Added ${formattedDate}`}</span>
          <Button color='error' onClick={() => deleteTask(task.id)}>
            <DeleteForeverIcon color={task.done ? 'disabled' : 'error'} />
          </Button>
        </div>
      )}
    </li>
  );
}
