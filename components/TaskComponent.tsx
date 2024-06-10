"use client";
import { Task } from "@prisma/client";
import React from "react";

const TaskComponent = ({ task }: { task: Task }) => {
  const updateTask = () => {
    fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": task.id,
        "validate": !task.validate,
      }),
    }).then((res) => res.json());
  };

  return (
    <li
      key={task.id}
      className="flex justify-between gap-8 my-2 w-full">
      <p>{task.name}</p>
      <div className="flex gap-4">
        <input
          type="checkbox"
          name={task.name}
          id={task.id}
          onClick={() => updateTask()}
          defaultChecked={task.validate}
        />
      </div>
    </li>
  );
};

export default TaskComponent;
