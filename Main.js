import express from 'express'; //adicionar "type": "module" no package.json
import cors from 'cors';
import Tarefa from '../Class/Tarefa.js';

const main = express();
main.use(express.json()); //para receber json

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

// onde vai rodar o servidor
main.listen(3444, () => {
    console.log("Servidor rodando na porta 3444");
});