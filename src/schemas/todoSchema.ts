import { z } from "zod";

// Esquema de validação do formulário de tarefas
export const tarefaSchema = z.object({
  titulo: z.string().min(5, "O título deve ter no mínimo 5 caracteres"),
  categoria: z.enum(["Trabalho", "Pessoal", "Urgente"]),
});