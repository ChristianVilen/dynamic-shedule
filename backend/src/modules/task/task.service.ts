import prisma from "../../utils/prisma";
import { CreateTaskInput, UpdateTaskInput } from "./task.schema";

export async function createTask(input: CreateTaskInput) {
  return await prisma.task.create({
    data: input,
  });
}

export async function updateTask(input: UpdateTaskInput) {
  const { id, ...rest } = input;

  return await prisma.task.update({
    where: {
      id,
    },
    data: rest,
  });
}
