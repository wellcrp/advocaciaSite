import fs from "node:fs";
import path from "node:path";

import dotenv from "dotenv";

function loadEnvironmentFiles(): void {
  const cwd = process.cwd();
  const runtimeEnv = process.env.NODE_ENV ?? "development";

  const baseEnvFile = path.join(cwd, ".env");
  const scopedEnvFile = path.join(cwd, `.env.${runtimeEnv}`);

  if (fs.existsSync(baseEnvFile)) {
    dotenv.config({ path: baseEnvFile });
  }

  if (fs.existsSync(scopedEnvFile)) {
    dotenv.config({ path: scopedEnvFile, override: true });
  }
}

loadEnvironmentFiles();

const env = {
  port: Number(process.env.PORT ?? 3333),
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5500",
  corsAllowedOrigins: (process.env.CORS_ORIGIN ?? "http://localhost:5500")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  corsAllowNullOrigin: process.env.CORS_ALLOW_NULL_ORIGIN === "true",
  logContactMessages: process.env.LOG_CONTACT_MESSAGES === "true",
  smtpHost: process.env.SMTP_HOST ?? "",
  smtpPort: Number(process.env.SMTP_PORT ?? 587),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPass: process.env.SMTP_PASS ?? "",
  contactToEmail: process.env.CONTACT_TO_EMAIL ?? "",
  contactFromEmail: process.env.CONTACT_FROM_EMAIL ?? "",
  emailjsApiUrl: process.env.EMAILJS_API_URL ?? "https://api.emailjs.com/api/v1.0/email/send",
  emailjsServiceId: process.env.EMAILJS_SERVICE_ID ?? "",
  emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID ?? "",
  emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY ?? "",
  emailjsPrivateKey: process.env.EMAILJS_PRIVATE_KEY ?? "",
  oauth2ClientId: process.env.OAUTH2_CLIENT_ID ?? "",
  oauth2ClientSecret: process.env.OAUTH2_CLIENT_SECRET ?? "",
  oauth2AuthorizeUrl: process.env.OAUTH2_AUTHORIZE_URL ?? "",
  oauth2TokenUrl: process.env.OAUTH2_TOKEN_URL ?? "",
  oauth2RedirectUri: process.env.OAUTH2_REDIRECT_URI ?? "",
  oauth2Scopes: process.env.OAUTH2_SCOPES ?? "openid profile email"
};

if (!Number.isFinite(env.port) || env.port <= 0) {
  throw new Error("PORT invalida. Defina um numero inteiro positivo em PORT.");
}

if (!Number.isFinite(env.smtpPort) || env.smtpPort <= 0) {
  throw new Error("SMTP_PORT invalida. Defina um numero inteiro positivo em SMTP_PORT.");
}

if (env.corsAllowedOrigins.length === 0) {
  throw new Error("CORS_ORIGIN invalida. Informe ao menos uma origem permitida.");
}

export default env;
