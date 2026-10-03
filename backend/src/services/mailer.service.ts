import nodemailer from "nodemailer";

import env from "../config/env";

function smtpConfigured(): boolean {
  return Boolean(
    env.smtpHost &&
      env.smtpUser &&
      env.smtpPass &&
      env.contactToEmail &&
      env.contactFromEmail
  );
}

export function isSmtpConfigured(): boolean {
  return smtpConfigured();
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  telefone?: string;
  message: string;
}): Promise<void> {
  if (!smtpConfigured()) {
    throw new Error("SMTP nao configurado. Defina as variaveis SMTP_* e CONTACT_* no .env.");
  }

  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass
    }
  });

  const subject = "Novo contato pelo site - Cardoso & Muscelli";

  const text = [
    `Nome: ${input.name}`,
    `E-mail: ${input.email}`,
    `Telefone: ${input.telefone ?? "Nao informado"}`,
    "",
    "Mensagem:",
    input.message
  ].join("\n");

  await transporter.sendMail({
    from: env.contactFromEmail,
    to: env.contactToEmail,
    replyTo: input.email,
    subject,
    text
  });
}
