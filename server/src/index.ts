import { createServer } from "node:http";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { attachWebSocket } from "./websocket/server.js";

const server = createServer(app);
attachWebSocket(server);

server.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});