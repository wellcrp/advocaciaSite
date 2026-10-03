import express from "express";

import authRoute from "./routes/auth.route";
import contactRoute from "./routes/contact.route";
import healthRoute from "./routes/health.route";
import { applySecurity } from "./middlewares/security";

const app = express();

applySecurity(app);
app.use(express.json({ limit: "100kb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    service: "advocacia-backend",
    status: "ok",
    docs: {
      health: "/api/health",
      contact: "/api/contact",
      oauth2Start: "/api/auth/oauth2/start"
    }
  });
});

app.use("/api", healthRoute);
app.use("/api", authRoute);
app.use("/api", contactRoute);

app.use((_req, res) => {
  res.status(404).json({ error: "Rota nao encontrada." });
});

export default app;
