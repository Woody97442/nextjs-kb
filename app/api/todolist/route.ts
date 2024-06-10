import { createTodoList, deleteTodoList, getTodoList, getTodoListById, updateTodoList } from "@/prisma/todolist";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            const todolist = await getTodoListById(id);
            return NextResponse.json(todolist, { status: 200 });
        }

        const todolist = await getTodoList();
        return NextResponse.json(todolist, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name } = await req.json();
        const todolist = await createTodoList(name);
        return NextResponse.json({ todolist: todolist, message: "Todo List created successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { name, id } = await req.json();
        const todolist = await updateTodoList(id, name);
        return NextResponse.json(todolist, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const todolist = await deleteTodoList(id);
        return NextResponse.json(todolist, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}