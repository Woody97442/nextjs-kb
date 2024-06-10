import prisma from "./prisma";

export const getTasks = async () => {
    return await prisma.task.findMany();
}

export const getTasksById = async (id: string) => {
    return await prisma.task.findUnique({
        where: {
            id
        }
    });
}

export const createTask = async (name: string, todoListId: string) => {
    return await prisma.task.create({
        data: {
            name,
            todoListId
        }
    });
}

export const updateTask = async (id: string, validate: boolean) => {
    return await prisma.task.update({
        where: {
            id
        },
        data: {
            validate
        }
    });
}

export const deleteTask = async (id: string) => {
    return await prisma.task.delete({
        where: {
            id
        }
    });
}