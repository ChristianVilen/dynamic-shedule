import { FastifyReply, FastifyRequest } from "fastify";
import { createTask } from "./service";
import { CreateTaskInput } from "./schema";

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
