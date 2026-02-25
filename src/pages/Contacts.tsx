import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Input from "../components/Input"
import Button from "../components/Button"
import { contatoSchema } from "../schemas/contactSchema"

type Formulario = z.infer<typeof contatoSchema>

type Contato = {
  id: string
  nomeCompleto: string
  email: string
  telefone: string
}

export default function CadastroContatos() {
  const [contatos, setContatos] = useState<Contato[]>(() => {
    const armazenado = localStorage.getItem("contatos")
    return armazenado ? JSON.parse(armazenado) : []
  })
  const [mostrarModal, setMostrarModal] = useState<boolean>(false)
  const [idContatoSelecionado, setIdContatoSelecionado] = useState<string>("")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Formulario>({
    resolver: zodResolver(contatoSchema),
  })

  useEffect(() => {
    localStorage.setItem("contatos", JSON.stringify(contatos))
  }, [contatos])

  function aoEnviarFormulario(dados: Formulario): void {
    const novoContato: Contato = {
      id: crypto.randomUUID(),
      nomeCompleto: dados.nomeCompleto.trim(),
      email: dados.email.trim(),
      telefone: dados.telefone.trim(),
    }

    setContatos(oldState => [...oldState, novoContato])
    reset()
  }

  function removerContato(id: string): void {
    setContatos(contatos.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#1d1b1b] flex flex-col items-center p-6 gap-6">
      <h1 className="text-white text-4xl font-bold">Cadastro de Contatos</h1>

      <form onSubmit={handleSubmit(aoEnviarFormulario)} className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-1">
          <Input
            label="Nome Completo"
            placeholder="Digite o nome completo"
            register={register("nomeCompleto")}
          />
          {errors.nomeCompleto && <span className="text-red-500">{errors.nomeCompleto.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            label="E-mail"
            placeholder="Digite o e-mail"
            type="email"
            register={register("email")}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            label="Telefone"
            placeholder="Digite o telefone"
            register={register("telefone")}
          />
          {errors.telefone && <span className="text-red-500">{errors.telefone.message}</span>}
        </div>

        <Button type="submit">Cadastrar Contato</Button>
      </form>

      <div className="w-full max-w-md flex flex-col gap-2 mt-4">
        {contatos.length === 0 && (
          <span className="text-gray-400 text-center mt-4">Nenhum contato cadastrado</span>
        )}

        {contatos.map(contato => (
          <div key={contato.id} className="flex justify-between items-center bg-[#2a2a2a] text-white px-4 py-2 rounded-2xl">
            <div className="flex flex-col text-left">
              <span className="font-semibold">{contato.nomeCompleto}</span>
              <span className="text-sm text-gray-400">{contato.email}</span>
              <span className="text-sm text-gray-400">{contato.telefone}</span>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                setIdContatoSelecionado(contato.id)
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
            <p>Deseja remover este contato?</p>
            <div className="flex gap-4 justify-end">
              <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                NÃO
              </Button>
              <Button onClick={() => {
                removerContato(idContatoSelecionado)
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