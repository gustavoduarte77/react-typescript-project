import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import '../App.css'
import Input from '../components/Input'
import Button from '../components/Button'

type Categoria = "Trabalho" | "Pessoal" | "Urgente"

interface ITarefa {
  id: string
  descricao: string
  categoria: Categoria
  criadoEm: string
  ativo: boolean
  concluido: boolean
}

interface IAjustarTarefa {
  id: string
  tipo: "ATUALIZAR" | "EXCLUIR"
}

interface IFormValues {
  descricao: string
  categoria: Categoria
}

const STORAGE_KEY = "tarefas"

export default function Todo() {
  const [tarefas, setTarefas] = useState<ITarefa[]>(() => {
    const salvo = localStorage.getItem(STORAGE_KEY)
    return salvo ? JSON.parse(salvo) : []
  })
  const [mostrarModal, setMostrarModal] = useState<boolean>(false)
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState<string>("")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormValues>({
    defaultValues: { categoria: "Pessoal" }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas))
  }, [tarefas])

  function adicionarTarefa({ descricao, categoria }: IFormValues): void {
    const montarObjetoTarefa: ITarefa = {
      id: Math.random().toString(36).substring(2, 9),
      descricao,
      categoria,
      criadoEm: new Date().toISOString(),
      concluido: false,
      ativo: true
    }

    setTarefas(oldState => [...oldState, montarObjetoTarefa])
    reset()
  }

  function ajustarTarefa({ id, tipo }: IAjustarTarefa): void {
    if (tipo === "ATUALIZAR") {
      const novoArrayTarefas = tarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, concluido: true } : { ...tarefa }
      )
      return setTarefas(novoArrayTarefas)
    }

    if (tipo === "EXCLUIR") {
      const novoArrayTarefas = tarefas.filter(tarefa => tarefa.id !== id)
      return setTarefas(novoArrayTarefas)
    }
  }

  return (
    <div className="min-h-screen bg-[#1d1b1b] flex flex-col items-center p-6 gap-6">

      <h1 className="text-white text-4xl font-bold">To-Do List</h1>

      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit(adicionarTarefa)}>
        <div className='input-wrapper'>
          <Input
            label="Título"
            placeholder="Digite uma tarefa..."
            register={register("descricao", {
              required: "Campo obrigatório.",
              minLength: { value: 5, message: "Mínimo 5 caracteres." }
            })}
          />
          {errors.descricao && <p className="text-red-500">{errors.descricao.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold text-lg">Categoria</label>
          <select
            {...register("categoria", { required: true })}
            className="px-4 py-2 rounded-2xl bg-[#2a2a2a] text-white font-medium outline-none border border-transparent focus:border-[#193b97] focus:ring-2 focus:ring-[#193b97] transition-all duration-300"
          >
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Urgente">Urgente</option>
          </select>
        </div>

        <Button type="submit">Adicionar Tarefa</Button>
      </form>

      <div className="w-full max-w-md flex flex-col gap-2 mt-4">
        {tarefas.length === 0 && (
          <span className="text-gray-400 text-center mt-4">Nenhuma tarefa cadastrada</span>
        )}
        {tarefas.map((tarefa) => (
          <div key={tarefa.id} className="flex justify-between items-center px-4 py-2 rounded-2xl bg-[#2a2a2a] text-white">
            <div className="flex flex-col text-left">
              <span className={`font-semibold ${tarefa.concluido ? 'line-through text-gray-400' : ''}`}>
                {tarefa.descricao}
              </span>
              <span className="text-sm text-gray-400">{tarefa.categoria}</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => ajustarTarefa({ id: tarefa.id, tipo: "ATUALIZAR" })}
              >
                Concluir
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIdTarefaSelecionada(tarefa.id)
                  setMostrarModal(true)
                }}
              >
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#2a2a2a] text-white rounded-2xl p-8 flex flex-col gap-4 w-full max-w-sm">
            <h2 className="text-xl font-bold">Confirmar exclusão</h2>
            <p>Deseja seguir com a sua solicitação?</p>
            <div className="flex gap-4 justify-end">
              <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                NÃO
              </Button>
              <Button onClick={() => {
                ajustarTarefa({ id: idTarefaSelecionada, tipo: "EXCLUIR" })
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