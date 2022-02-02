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
      className="TodoItem-li-done"
      style={{ backgroundColor: task.done ? "#c6ffdd" : "#f7797d" }}
    >
      <span className={task.done ? "Task-done" : "Task-undone"}>
        {task.text}
      </span>
      <div>
        <span> {task.date} </span>
        <button onClick={() => deleteTask(task.id)}> 🗑️ </button>
        <button onClick={() => statusTask(task.id)}>
          {task.done ? "✔️" : " 🚩"}
        </button>
      </div>
    </li>
  );
}
