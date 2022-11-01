import { FastifyInstance } from "fastify";
import { $ref } from "./week.schema";
import { getWeeksHandler } from "./week.controller";

export async function WeekRoute(server: FastifyInstance) {
  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("weeksResponseSchema"),
        },
      },
    },
    getWeeksHandler
  );
}
