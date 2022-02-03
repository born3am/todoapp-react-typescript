import React from "react";
import { TodoItemType } from "./interfaces";
import "./TodoItem.css";

type Props = {
  task: TodoItemType;
  deleteTask: (id: string) => void;
  statusTask: (id: string) => void;
};

export default function TodoItem({ task, deleteTask, statusTask }: Props) {
  return (
    <li
      className={task.done ? "TodoItem-li-done" : "TodoItem-li-undone "}
    >
      <span className={task.done ? "Task-done" : "Task-undone"}>
        {task.text}
      </span>
      <div>
        <span className="TodoItem-date"> {task.date} </span>
        <button onClick={() => deleteTask(task.id)}> 🗑️ </button>
        <button onClick={() => statusTask(task.id)}>
          {task.done ? "✔️" : " 🚩"}
        </button>
      </div>
    </li>
  );
}
