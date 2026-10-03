import env from "../config/env";
import { isEmailJsConfigured, sendContactWithEmailJs } from "./emailjs.service";
import { isSmtpConfigured, sendContactEmail } from "./mailer.service";

type ContactInput = {
  name: string;
  email: string;
  telefone?: string;
  message: string;
};

export async function processContactMessage(input: ContactInput): Promise<void> {
  if (isSmtpConfigured()) {
    await sendContactEmail(input);
    return;
  }

  if (isEmailJsConfigured()) {
    await sendContactWithEmailJs(input);
    return;
  }

  if (env.logContactMessages) {
    console.info("[contact-message][fallback-log]", {
      name: input.name,
      email: input.email,
      telefone: input.telefone ?? "",
      messagePreview: input.message.slice(0, 120)
    });
  }
}
