import Fastify from "fastify";
import { routes } from "./src/modules/task/route";
import { schemas } from "./src/modules/task/schema";

const server = Fastify();

async function main() {
  for (const schema of schemas) {
    server.addSchema(schema);
  }

  server.register(routes, { prefix: "api/task" });

  try {
    await server.listen({ port: 3000 });
    console.log("Ready for connection port 3000");
  } catch (e) {
    console.error(e);
  }
}

main();
