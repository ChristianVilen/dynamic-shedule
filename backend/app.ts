import Fastify from "fastify";
import { taskSchemas } from "./src/modules/task/task.schema";
import { TaskRoute } from "./src/modules/task/task.route";
import { WeekRoute } from "./src/modules/week/week.route";
import { weekSchemas } from "./src/modules/week/week.schema";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
dotenv.config();

const server = Fastify();

async function main() {
  for (const schema of [...taskSchemas, ...weekSchemas]) {
    server.addSchema(schema);
  }

  server.register(cors, {
    origin: (origin, cb) => {
      // if request comes from e.g. postman origin is undefined
      const hostname = origin ? new URL(origin).hostname : null;
      if (process.env.NODE_ENV === "development" || hostname === "localhost") {
        cb(null, true);
        return;
      }
      cb(new Error("Not allowed"), false);
    },
  });
  server.register(TaskRoute, { prefix: "api/task" });
  server.register(WeekRoute, { prefix: "api/week" });

  try {
    await server.listen({ port: 3000 });
    console.log("Ready for connection port 3000");
  } catch (e) {
    console.error(e);
  }
}

main();
