# Portal de Gestão Pessoal

Uma aplicação web desenvolvida em React + TypeScript que centraliza o gerenciamento 
de tarefas, contatos e finanças pessoais em um único portal. O objetivo é oferecer 
ao utilizador final uma experiência simples, rápida e persistente — sem necessidade 
de cadastro ou servidor, utilizando localStorage para manter os dados entre sessões.
```

---

**2. Milestones** — cria primeiro antes das issues. Vai em:
**Issues > Milestones > New Milestone**

- **M1 — Estrutura de Rotas e Home**
- **M2 — Finalização dos Módulos de Dados**

---

**3. Issues (User Stories)** — cria as 5 issues em **Issues > New Issue**, uma por uma, e associa cada uma ao **M2**:

**Issue 1 — Adicionar tarefa**
```
Como utilizador, eu quero adicionar uma tarefa com título e categoria 
para que eu possa organizar minhas atividades por prioridade.

Critérios de Aceitação:
- O campo título é obrigatório e deve ter no mínimo 5 caracteres
- O campo categoria aceita apenas: Trabalho, Pessoal ou Urgente
- A tarefa aparece na lista imediatamente após ser adicionada
```

**Issue 2 — Persistência de tarefas**
```
Como utilizador, eu quero que minhas tarefas sejam salvas automaticamente 
para que eu não perca meus dados ao fechar o navegador.

Critérios de Aceitação:
- Os dados são salvos no localStorage ao adicionar uma tarefa
- Ao recarregar a página, as tarefas salvas são carregadas corretamente
- A lista não é perdida ao navegar entre páginas
```

**Issue 3 — Concluir tarefa**
```
Como utilizador, eu quero marcar uma tarefa como concluída 
para que eu consiga acompanhar meu progresso.

Critérios de Aceitação:
- Ao clicar em "Concluir", o texto da tarefa recebe estilo de riscado
- A mudança é refletida imediatamente na interface
- A tarefa concluída permanece salva no localStorage
```

**Issue 4 — Excluir tarefa com confirmação**
```
Como utilizador, eu quero excluir uma tarefa com confirmação 
para que eu não remova itens por engano.

Critérios de Aceitação:
- Ao clicar em "Excluir", um modal de confirmação é exibido
- A tarefa só é removida se o utilizador confirmar clicando em "SIM"
- Ao clicar em "NÃO", o modal fecha e a tarefa permanece na lista
```

**Issue 5 — Validação do formulário**
```
Como utilizador, eu quero receber mensagens de erro ao preencher 
o formulário incorretamente para que eu entenda o que precisa ser corrigido.

Critérios de Aceitação:
- O campo título exibe "Campo obrigatório." se enviado vazio
- O campo título exibe "Mínimo 5 caracteres." se tiver menos de 5 caracteres
- O formulário não é submetido enquanto houver erros de validação
