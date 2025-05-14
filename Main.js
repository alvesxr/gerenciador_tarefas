import express from 'express'; //adicionar "type": "module" no package.json
import cors from 'cors';
import Tarefa from '../Class/Tarefa.js';

const main = express();
main.use(express.json()); //para receber json
main.use(cors()); //para permitir cors

//rotas:

// Array em memória para armazenar as tarefas
let tarefas = [];

// Rota para criar uma nova tarefa
main.post('/tarefas', (req, res) => {
    const { titulo, descricao, dataCriacao, prioridade } = req.body;
    const novaTarefa = new Tarefa(titulo, descricao, dataCriacao, prioridade);
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});



// Rota para listar todas as tarefas
main.get('/tarefas', (req, res) => {
    res.json(tarefas);
});



// Rota para editar o título de uma tarefa
main.put('/tarefas/:id/titulo', (req, res) => {
    const { id } = req.params;//pega o id da tarefa e usa no parametro
    const { titulo } = req.body;//pega o titulo do body
    
    const tarefa = tarefas.find(t => t.id === parseInt(id));// procura a tarefa pelo id

    if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    tarefa.editarTitulo(titulo);
    res.json(tarefa);
});



// Rota para editar a descrição de uma tarefa
main.put('/tarefas/:id/descricao', (req, res) =>{
    const { id} = req.params;
    const { descricao} = req.body;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    tarefa.editarDescricao(descricao);
    res.json(tarefa);
})



// Rota para editar a data de criação de uma tarefa
main.put('/tarefas/:id/dataCriacao', (req, res) =>{
    const {id} = req.params;
    const {dataCriacao} = req.body;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    tarefa.editarDataCriacao(dataCriacao);
    res.json(tarefa);
})


// Rota para editar a prioridade de uma tarefa
main.put('/tarefas/:id/prioridade', (req, res) => {
    const {id} = req.params;
    const {prioridade} = req.body;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    tarefa.editarPrioridade(prioridade);
    res.json(tarefa);
})

// onde vai rodar o servidor
main.listen(3444, () => {
    console.log("Servidor rodando na porta 3444");
});