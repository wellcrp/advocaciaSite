import cors from "cors";
import type { Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import env from "../config/env";

export function applySecurity(app: Express): void {
  app.use(helmet());

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }

        if (origin === "null" && env.corsAllowNullOrigin) {
          callback(null, true);
          return;
        }

        if (env.corsAllowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error(`Origem nao permitida por CORS: ${origin}`));
      },
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"]
    })
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false
    })
  );
}
