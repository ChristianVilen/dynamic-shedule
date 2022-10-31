import prisma from "../../utils/prisma";
import { CreateTaskInput } from "./task.schema";

export async function createTask(input: CreateTaskInput) {
  return await prisma.task.create({
    data: input,
  });
}
