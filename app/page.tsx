"use client";
import TaskComponent from "@/components/TaskComponent";
import { deleteTodoList } from "@/prisma/todolist";
import { Task, TodoList } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TodoListInterface {
  id: string;
  name: string;
  tasks: Task[];
}

export default function Home() {
  const [todolist, setTodolist] = useState<TodoListInterface[]>([]);

  // Get all tasks
  useEffect(() => {
    fetch("/api/todolist")
      .then((res) => res.json())
      .then((data) => setTodolist(data));
  }, []);

  const deleteTask = (id: string) => {
    fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": id,
      }),
    }).then((res) => {
      if (res.ok) {
        setTodolist((prevState) =>
          prevState.map((todo) => ({
            ...todo,
            tasks: todo.tasks.filter((task) => task.id !== id),
          }))
        );
      }
    });
  };

  const deleteTodoList = (id: string) => {
    fetch("/api/todolist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": id,
      }),
    }).then((res) => {
      if (res.ok) {
        setTodolist((prevState) => prevState.filter((todo) => todo.id !== id));
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-4xl font-bold">My Zebi List</h1>
      <div className="flex gap-8 w-full justify-center">
        {todolist.map((todo: TodoListInterface) => (
          <ul
            className="flex flex-col border-2 p-4 rounded-sm shadow-lg max-w-[300px]"
            key={todo.id}>
            <div className="  mb-2 border-b-2 text-red-500 text-center flex justify-between">
              <h2 className="text-2xl font-bold">{todo.name}</h2>

              <button
                className="text-black hover:text-red-700"
                onClick={() => deleteTodoList(todo.id)}>
                X
              </button>
            </div>
            {todo.tasks.map((task: Task) => (
              <div
                className="flex gap-4"
                key={task.id}>
                <button
                  className="text-black hover:text-red-700"
                  onClick={() => deleteTask(task.id)}>
                  X
                </button>
                <TaskComponent task={task} />
              </div>
            ))}
            <Link
              href={"/create-task/" + todo.id}
              className="text-blue-500 hover:underline hover:text-blue-700">
              Add new Task
            </Link>
          </ul>
        ))}
      </div>

      <Link
        href="/create-todo"
        className="text-blue-500 hover:underline hover:text-blue-700">
        Create a new Todo List
      </Link>
    </main>
  );
}
