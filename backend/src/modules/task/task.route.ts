import { FastifyInstance } from "fastify";
import { insertHandler, updateHandler } from "./task.controller";
import { $ref } from "./task.schema";

export async function TaskRoute(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("creatTaskSchema"),
        response: {
          201: $ref("taskResponseSchema"),
        },
      },
    },
    insertHandler
  );
  server.put(
    "/",
    {
      schema: {
        body: $ref("updateTaskSchema"),
        response: {
          200: $ref("taskResponseSchema"),
        },
      },
    },
    updateHandler
  );
}
