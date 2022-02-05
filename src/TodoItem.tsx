import React from "react";
import { TodoItemType } from "./interfaces";
import "./TodoItem.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";

type Props = {
  task: TodoItemType;
  deleteTask: (id: string) => void;
  statusTask: (id: string) => void;
};

export default function TodoItem({ task, deleteTask, statusTask }: Props) {
  return (
    <li className={task.done ? "TodoItem-li-done" : "TodoItem-li-undone "}>
      <Button onClick={() => statusTask(task.id)}>
        {task.done ? (
          <CheckCircleOutlineIcon />
        ) : (
          <RadioButtonUncheckedTwoToneIcon />
        )}
      </Button>
      <p className={task.done ? "Task-done" : "Task-undone"}  >{task.text}</p>
      <div>
        <span className="TodoItem-date"> {task.date} </span>
        <Button color="error" onClick={() => deleteTask(task.id)}>
          {" "}
          <DeleteForeverIcon />{" "}
        </Button>
      </div>
    </li>
  );
}
