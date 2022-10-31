import Fastify from "fastify";
import { taskSchemas } from "./src/modules/task/task.schema";
import { taskRoute } from "./src/modules/task/task.route";

const server = Fastify();

async function main() {
  for (const schema of taskSchemas) {
    server.addSchema(schema);
  }

  server.register(taskRoute, { prefix: "api/task" });

  try {
    await server.listen({ port: 3000 });
    console.log("Ready for connection port 3000");
  } catch (e) {
    console.error(e);
  }
}

main();
