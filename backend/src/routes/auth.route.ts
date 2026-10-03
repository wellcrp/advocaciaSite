import { Router } from "express";
import { z } from "zod";

import {
  exchangeCodeForToken,
  isOAuth2Configured,
  startOAuth2Login
} from "../services/oauth2.service";

const authRoute = Router();

const callbackSchema = z.object({
  code: z.string().min(1),
  state: z.string().min(1)
});

authRoute.get("/auth/oauth2/start", (_req, res) => {
  if (!isOAuth2Configured()) {
    return res.status(503).json({
      error: "OAuth2 nao configurado no servidor."
    });
  }

  const result = startOAuth2Login();

  return res.status(200).json({
    authorizationUrl: result.authorizationUrl,
    state: result.state
  });
});

authRoute.get("/auth/oauth2/callback", async (req, res) => {
  const parsed = callbackSchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ error: "Parametros OAuth2 invalidos." });
  }

  try {
    const tokens = await exchangeCodeForToken({
      code: parsed.data.code,
      state: parsed.data.state
    });

    return res.status(200).json({
      message: "Login OAuth2 concluido com sucesso.",
      tokenType: tokens.token_type ?? null,
      expiresIn: tokens.expires_in ?? null,
      scope: tokens.scope ?? null
    });
  } catch (error) {
    return res.status(401).json({
      error: error instanceof Error ? error.message : "Falha no fluxo OAuth2."
    });
  }
});

export default authRoute;
