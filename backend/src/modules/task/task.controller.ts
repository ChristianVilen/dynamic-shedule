import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskInput, UpdateTaskInput } from "./task.schema";
import { createTask, updateTask } from "./task.service";

export async function insertHandler(
  req: FastifyRequest<{
    Body: CreateTaskInput;
  }>,
  res: FastifyReply
) {
  const body = req.body;

  try {
    const task = await createTask(body);

    return res.code(201).send(task);
  } catch (e) {
    console.error(e);
    return res.code(500).send();
  }
}

export async function updateHandler(
  req: FastifyRequest<{
    Body: UpdateTaskInput;
  }>,
  res: FastifyReply
) {
  const body = req.body;

  try {
    const task = await updateTask(body);

    return res.code(200).send(task);
  } catch (e) {
    console.error(e);
    return res.code(500).send();
  }
}
