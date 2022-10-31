import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskInput } from "./task.schema";
import { createTask } from "./task.service";

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
