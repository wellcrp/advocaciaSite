import { Router } from "express";
import { z } from "zod";

import { processContactMessage } from "../services/contact.service";

const contactRoute = Router();

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe um nome valido."),
  email: z.string().trim().email("Informe um e-mail valido."),
  telefone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10, "Mensagem muito curta.").max(2000, "Mensagem muito longa.")
});

contactRoute.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Dados invalidos",
      details: parsed.error.flatten().fieldErrors
    });
  }

  await processContactMessage(parsed.data);

  return res.status(200).json({
    message: "Mensagem recebida com sucesso."
  });
});

export default contactRoute;
