import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Input from "../components/Input"
import Button from "../components/Button"
import { transacaoSchema } from "../schemas/financeSchema"

type Formulario = z.infer<typeof transacaoSchema>

type Transacao = {
  id: string
  descricao: string
  valor: number
  tipo: "entrada" | "saida"
}

export default function MoneyFlow() {
  const [transacoes, setTransacoes] = useState<Transacao[]>(() => {
    const armazenado = localStorage.getItem("transacoes")
    return armazenado ? JSON.parse(armazenado) : []
  })
  const [mostrarModal, setMostrarModal] = useState<boolean>(false)
  const [idTransacaoSelecionada, setIdTransacaoSelecionada] = useState<string>("")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Formulario>({
    resolver: zodResolver(transacaoSchema),
    defaultValues: { descricao: "", valor: 0, tipo: "entrada" },
  })

  useEffect(() => {
    localStorage.setItem("transacoes", JSON.stringify(transacoes))
  }, [transacoes])

  const saldoTotal = transacoes.reduce(
    (acc, t) => (t.tipo === "entrada" ? acc + t.valor : acc - t.valor),
    0
  )

  function aoEnviarFormulario(dados: Formulario): void {
    const novoRegistro: Transacao = {
      id: crypto.randomUUID(),
      descricao: dados.descricao.trim(),
      valor: dados.valor,
      tipo: dados.tipo,
    }

    setTransacoes(oldState => [...oldState, novoRegistro])
    reset()
  }

  function removerTransacao(id: string): void {
    setTransacoes(transacoes.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#1d1b1b] flex flex-col items-center p-6 gap-6">
      <h1 className="text-white text-4xl font-bold">Controle de Gastos</h1>

      <div className="text-white text-2xl font-semibold">
        Saldo Total: R$ {saldoTotal.toFixed(2)}
      </div>

      <form onSubmit={handleSubmit(aoEnviarFormulario)} className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-1">
          <Input
            label="Descrição"
            placeholder="Digite a descrição"
            register={register("descricao")}
          />
          {errors.descricao && <span className="text-red-500">{errors.descricao.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            label="Valor"
            placeholder="Digite o valor"
            type="number"
            register={register("valor", { valueAsNumber: true })}
          />
          {errors.valor && <span className="text-red-500">{errors.valor.message}</span>}
        </div>

        <div className="flex gap-4 text-white font-semibold">
          <label className="flex items-center gap-2">
            <input type="radio" value="entrada" {...register("tipo")} />
            Entrada
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="saida" {...register("tipo")} />
            Saída
          </label>
        </div>

        <Button type="submit">Adicionar</Button>
      </form>

      <div className="w-full max-w-md flex flex-col gap-2 mt-4">
        {transacoes.length === 0 && (
          <span className="text-gray-400 text-center mt-4">Nenhuma transação registrada</span>
        )}

        {transacoes.map(t => (
          <div key={t.id} className={`flex justify-between items-center px-4 py-2 rounded-2xl ${t.tipo === "entrada" ? "bg-green-600" : "bg-red-600"} text-white`}>
            <div className="flex flex-col text-left">
              <span className="font-semibold">{t.descricao}</span>
              <span className="text-sm">R$ {t.valor.toFixed(2)}</span>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                setIdTransacaoSelecionada(t.id)
                setMostrarModal(true)
              }}
            >
              Remover
            </Button>
          </div>
        ))}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#2a2a2a] text-white rounded-2xl p-8 flex flex-col gap-4 w-full max-w-sm">
            <h2 className="text-xl font-bold">Confirmar exclusão</h2>
            <p>Deseja remover esta transação?</p>
            <div className="flex gap-4 justify-end">
              <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                NÃO
              </Button>
              <Button onClick={() => {
                removerTransacao(idTransacaoSelecionada)
                setMostrarModal(false)
              }}>
                SIM
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}