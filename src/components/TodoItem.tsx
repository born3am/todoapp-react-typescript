//Native Imports
import React from 'react';

//External Imports
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
import { Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import moment from 'moment';

//Internal Imports
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

  return (
    <li className={task.done ? 'TodoItem-li-done' : 'TodoItem-li-undone '}>
      <div>
        <Button onClick={() => statusTask(task.id)}>
          {task.done ? <CheckCircleOutlineIcon color='disabled' /> : <RadioButtonUncheckedTwoToneIcon color='action' />}
        </Button>

        <span className={task.done ? 'Task-done' : 'Task-undone'}>{task.text}</span>
      </div>
      {matches && (
        <div>
          <span className='TodoItem-date'> {`Added ${moment(task.date).fromNow()}`} </span>

          <Button color='error' onClick={() => deleteTask(task.id)}>
            {task.done ? <DeleteForeverIcon color='disabled' /> : <DeleteForeverIcon color='error' />}
          </Button>
        </div>
      )}
    </li>
  );
}
