<!-- README em HTML -->

<h1>Gerenciador de Tarefas - API</h1>

<p>
API REST para organização de tarefas, desenvolvida em Node.js com Express. Permite criar, listar, editar, excluir e marcar tarefas como concluídas, além de filtrar por prioridade e status de conclusão. Os dados são armazenados em memória.
</p>

<h2>Funcionalidades</h2>
<ul>
  <li>CRUD completo de tarefas</li>
  <li>Prioridade: baixa, média ou alta</li>
  <li>Marcar tarefa como concluída</li>
  <li>Filtros por prioridade e conclusão</li>
</ul>

<h2>Rotas principais</h2>
<ul>
  <li><code>POST /tarefas</code> – Criar tarefa</li>
  <li><code>GET /tarefas</code> – Listar tarefas (com filtros opcionais)</li>
  <li><code>GET /tarefas/:id</code> – Buscar tarefa por id</li>
  <li><code>PUT /tarefas/:id/titulo</code> – Editar título</li>
  <li><code>PUT /tarefas/:id/descricao</code> – Editar descrição</li>
  <li><code>PUT /tarefas/:id/dataCriacao</code> – Editar data de criação</li>
  <li><code>PUT /tarefas/:id/prioridade</code> – Editar prioridade</li>
  <li><code>PATCH /tarefas/:id/concluir</code> – Marcar como concluída</li>
  <li><code>DELETE /tarefas/:id</code> – Excluir tarefa</li>
</ul>

<h2>Filtros</h2>
<ul>
  <li><code>/tarefas?prioridade=alta</code></li>
  <li><code>/tarefas?concluida=true</code></li>
  <li><code>/tarefas?prioridade=media&amp;concluida=false</code></li>
</ul>

<hr>

<p><strong>Observação:</strong> Os dados são armazenados apenas em memória, ou seja, ao reiniciar o servidor, as tarefas são perdidas.</p>
