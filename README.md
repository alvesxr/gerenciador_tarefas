Gerenciador de Tarefas - API
API REST para organização de tarefas, desenvolvida em Node.js com Express. Permite criar, listar, editar, excluir e marcar tarefas como concluídas, além de filtrar por prioridade e status de conclusão. Os dados são armazenados em memória.

Funcionalidades
CRUD completo de tarefas
Prioridade: baixa, média ou alta
Marcar tarefa como concluída
Filtros por prioridade e conclusão
Rotas principais
POST /tarefas – Criar tarefa
GET /tarefas – Listar tarefas (com filtros opcionais)
GET /tarefas/:id – Buscar tarefa por id
PUT /tarefas/:id/titulo – Editar título
PUT /tarefas/:id/descricao – Editar descrição
PUT /tarefas/:id/dataCriacao – Editar data de criação
PUT /tarefas/:id/prioridade – Editar prioridade
PATCH /tarefas/:id/concluir – Marcar como concluída
DELETE /tarefas/:id – Excluir tarefa
Filtros
/tarefas?prioridade=alta
/tarefas?concluida=true
/tarefas?prioridade=media&concluida=false
Observação: Os dados são armazenados apenas em memória, ou seja, ao reiniciar o servidor, as tarefas são perdidas.

