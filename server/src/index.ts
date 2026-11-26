import { createServer } from "node:http";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectMongo } from "./config/mongo.js";
import { attachWebSocket } from "./websocket/server.js";
import { startHeartbeatSweeper } from "./services/heartbeat.service.js";
import { startDispatchLoop } from "./services/dispatch.service.js";

await connectMongo();

startHeartbeatSweeper();
startDispatchLoop();

const server = createServer(app);
attachWebSocket(server);

server.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});