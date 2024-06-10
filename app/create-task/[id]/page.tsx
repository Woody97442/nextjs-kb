"use client";
import { TodoList } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Task = ({ params }: { params: { id: string } }) => {
  const [name, setName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { id } = params;
  const [todolist, setTodolist] = useState<TodoList>();

  // Get todolist
  useEffect(() => {
    fetch("/api/todolist?id=" + id)
      .then((res) => res.json())
      .then((data) => setTodolist(data));
  });

  const createTask = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, todoListId: id }),
    });

    const data = await res.json();
    setResponseMessage(data.message);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-5">
      <div className="flex gap-4 ">
        <Link
          href="/"
          className="text-black hover:underline hover:text-blue-700">
          Back
        </Link>
        <h1 className="text-2xl pb-20">Create Task in {todolist?.name}</h1>
      </div>
      <form
        onSubmit={createTask}
        className="flex gap-4 flex-col">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          className="border-2 p-2 rounded-sm"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn bg-blue-500 text-white p-2 rounded-sm hover:text-blue-500 hover:bg-white">
          Submit
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Task;
