import { FastifyInstance } from "fastify";
import { insertHandler } from "./controller";
import { $ref } from "./schema";

export async function routes(server: FastifyInstance) {
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
}
