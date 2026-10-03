import { Router } from "express";

import { isOAuth2Configured } from "../services/oauth2.service";
import { isSmtpConfigured } from "../services/mailer.service";

const healthRoute = Router();

healthRoute.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "advocacia-backend",
    integrations: {
      smtpConfigured: isSmtpConfigured(),
      oauth2Configured: isOAuth2Configured()
    }
  });
});

export default healthRoute;
