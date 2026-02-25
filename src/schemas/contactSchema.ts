import { z } from "zod";

// Esquema de validação do formulário de contatos
export const contatoSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().regex(/^[0-9]*$/, "Telefone deve conter apenas números"),
});