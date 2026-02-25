import { z } from "zod";

export const transacaoSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z.number().positive("O valor deve ser positivo"),
  tipo: z.enum(["entrada", "saida"]),
});