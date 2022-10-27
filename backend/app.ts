import Fastify from "fastify";
import { routes } from "./src/route";
const server = Fastify();

async function main() {
  server.register(routes, { prefix: "api" });

  try {
    await server.listen({ port: 3000 });
    console.log("Ready for connection");
  } catch (e) {
    console.error(e);
  }
}

main();
