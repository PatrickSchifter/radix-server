import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import ip from "ip";
import router from "./routes";
import { config } from "./config/config";

const app = express();
const serverIp = ip.address();
const port = config.server.port;

app.use(cors({ origin: "*" }));

const server = http.createServer(app);

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("System is running.");
});

server.listen(port, () => {
  console.info(`⚡ Server is running on: ${serverIp} and port ${port}`);
});

export default app;
