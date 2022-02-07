import React from "react";
import { TodoItemType } from "./interfaces";
import "./TodoItem.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import "animate.css";

type Props = {
  task: TodoItemType;
  deleteTask: (id: string) => void;
  statusTask: (id: string) => void;
};



export default function TodoItem({ task, deleteTask, statusTask }: Props) {
    const matches = useMediaQuery("(min-width:600px)");

  return (
    <li className={task.done ? "TodoItem-li-done" : "TodoItem-li-undone "}>
      <div>
        <Button onClick={() => statusTask(task.id)}>
          {task.done ? (
            <CheckCircleOutlineIcon color="disabled" />
          ) : (
            <RadioButtonUncheckedTwoToneIcon color="action" />
          )}
        </Button>

        <span className={task.done ? "Task-done" : "Task-undone"}>
          {task.text}
        </span>
      </div>
      {matches && (
      <div>        
          <span className="TodoItem-date">  {`Added on: ${task.date}`} </span>

        <Button color="error" onClick={() => deleteTask(task.id)}>
          {task.done ? (
            <DeleteForeverIcon color="disabled" />
          ) : (
            <DeleteForeverIcon color="error" />
          )}
        </Button>
      </div>)
      }
    </li>
  );
}
