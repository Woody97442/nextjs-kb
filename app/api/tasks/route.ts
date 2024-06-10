import { createTask, deleteTask, getTasks, getTasksById, updateTask } from "@/prisma/task";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            const task = await getTasksById(id);
            return NextResponse.json(task, { status: 200 });
        }

        const task = await getTasks();
        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, todoListId } = await req.json();
        const task = await createTask(name, todoListId);
        console.log(task);
        return NextResponse.json({ task: task, message: "Task created successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { validate, id } = await req.json();
        const task = await updateTask(id, validate);
        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const task = await deleteTask(id);
        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}