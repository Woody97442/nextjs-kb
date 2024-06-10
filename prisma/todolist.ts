import prisma from "./prisma";

export const getTodoList = async () => {
    const data = await prisma.todoList.findMany(
        {
            include: {
                tasks: true
            }
        }
    );

    return data;
}

export const getTodoListById = async (id: string) => {
    return await prisma.todoList.findUnique({
        where: {
            id
        }
    });
}

export const createTodoList = async (name: string) => {
    return await prisma.todoList.create({
        data: {
            name
        }
    });
}

export const updateTodoList = async (id: string, name: string) => {
    return await prisma.todoList.update({
        where: {
            id
        },
        data: {
            name
        }
    });
}

export const deleteTodoList = async (id: string) => {
    return await prisma.todoList.delete({
        where: {
            id
        }
    });
}