import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import ip from "ip";
import router from "./routes";
import { config } from "./config/config";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

declare module "express-serve-static-core" {
  interface Request {
    equipmentId?: string;
  }
}

const app = express();
const serverIp = ip.address();
const port = config.server.port;

app.use(cors({ origin: "*" }));
app.use(express.json());

const server = http.createServer(app);
const apiServerUrl = `${config.server.base_url}/api`;

app.use("/api", router);

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: `${config.company.name} API Server`,
      version: "1.0.0",
    },
    servers: [
      {
        url: apiServerUrl,
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
      {
        apiKeyAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          in: "header",
          name: "Authorization",
        },
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "X-API-KEY",
        },
      },
    },
  },
  apis: ["./src/**/**/*.{js,ts}"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.send("System is running.");
});

server.listen(port, () => {
  console.info(`⚡ Server is running on: ${serverIp} and port ${port}`);
});

export default app;
