import env from "../config/env";

type ContactInput = {
  name: string;
  email: string;
  telefone?: string;
  message: string;
};

export function isEmailJsConfigured(): boolean {
  return Boolean(env.emailjsServiceId && env.emailjsTemplateId && env.emailjsPublicKey);
}

export async function sendContactWithEmailJs(input: ContactInput): Promise<void> {
  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS nao configurado. Defina EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID e EMAILJS_PUBLIC_KEY.");
  }

  const payload: Record<string, unknown> = {
    service_id: env.emailjsServiceId,
    template_id: env.emailjsTemplateId,
    user_id: env.emailjsPublicKey,
    template_params: {
      name: input.name,
      email: input.email,
      telefone: input.telefone ?? "",
      message: input.message
    }
  };

  if (env.emailjsPrivateKey) {
    payload.accessToken = env.emailjsPrivateKey;
  }

  const response = await fetch(env.emailjsApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Falha no envio via EmailJS: ${response.status} ${responseText}`);
  }
}
