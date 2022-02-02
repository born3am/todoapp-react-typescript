import React from "react";
import { TodoItemType } from "./interfaces";
import "./TodoItem.css";

type Props = {
  task: TodoItemType;
  deleteTask: (id: string) => void;
  updateTask: (id: string) => void;
};

export default function TodoItem({ task, deleteTask, updateTask }: Props) {
  return (
    <li
      className="TodoItem-li"
      style={{ backgroundColor: task.done ? "#c6ffdd" : "#f7797d" }}
    >
      {task.text}
      <div>
        <span> {task.date} </span>
        <button onClick={() => deleteTask(task.id)}> 🗑️ </button>{" "}
        <button onClick={() => updateTask(task.id)}>✔️ or ✖️ </button>
      </div>
    </li>
  );
}
