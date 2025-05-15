import express from 'express'; //adicionar "type": "module" no package.json
import cors from 'cors';
import Tarefa from '../Class/Tarefa.js';
import { body, validationResult } from 'express-validator'; // express-validator para validação de dados
// /npm install express-validator para instalar


const main = express();
main.use(express.json()); //para receber json
main.use(cors()); //para permitir cors

//rotas:

// Array em memória para armazenar as tarefas
let tarefas = [];

// Rota para criar uma nova tarefa
main.post('/tarefas',
    [
        body('titulo').notEmpty().withMessage('Titulo é obrigatório'),
        body('descricao').notEmpty().withMessage('Descrição é obrigatória'),
        body('dataCriacao').notEmpty().withMessage('Data de criação é obrigatória'),
        body('prioridade').isIn(['baixa', 'media', 'alta']).withMessage('Prioridade deve ser baixa, media ou alta')
        //isIn verifica se o valor está dentro do array
    ],
    (req, res) => {
        const errors = validationResult(req); //validationResult verifica se houve erro na validação
        //validationResult(req) retorna um objeto com os erros encontrados
        if (!errors.isEmpty()){ //isEmpty verifica se o array está vazio
            return res.status(400).json({errors: errors.array()});
            //errors.array() retorna um array com os erros encontrados
        }
        const { titulo, descricao, dataCriacao, prioridade } = req.body;
        const prioridadeFormatada = prioridade.toLowerCase(); // Converte a prioridade para minúsculas
        const novaTarefa = new Tarefa(titulo, descricao, dataCriacao, prioridadeFormatada);
        novaTarefa.id = Date.now(); // Gera um id único simples usando o timestamp atual
        tarefas.push(novaTarefa);
        res.status(201).json(novaTarefa);
    });



// Rota para listar todas as tarefas com filtros opcionais
main.get('/tarefas', (req, res) => {
    let resultado = [...tarefas]; // copia o array para não alterar o original

    // Filtro por prioridade
    if (req.query.prioridade) {
        resultado = resultado.filter(t => t.prioridade === req.query.prioridade.toLowerCase());
    }

    // Filtro por concluída
    if (req.query.concluida) {
        if (req.query.concluida === 'true') {
            resultado = resultado.filter(t => t.dataConclusao !== null);
        } else if (req.query.concluida === 'false') {
            resultado = resultado.filter(t => t.dataConclusao === null);
        }
    }

    res.json(resultado);
});



// Rota para editar o título de uma tarefa
main.put('/tarefas/:id/titulo',
    [body('titulo').notEmpty().withMessage('Titulo é obrigatório')],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
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
main.put('/tarefas/:id/descricao', 
    [body('descricao').notEmpty().withMessage('Descrição é obrigatória')],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { descricao } = req.body;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    tarefa.editarDescricao(descricao);
    res.json(tarefa);
})



// Rota para editar a data de criação de uma tarefa
main.put('/tarefas/:id/dataCriacao',
    [body('dataCriacao').notEmpty().withMessage('Data de criação é obrigatória')],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { dataCriacao } = req.body;
        const tarefa = tarefas.find(t => t.id === parseInt(id));
        if (!tarefa) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        tarefa.editarDataCriacao(dataCriacao);
        res.json(tarefa);
    }
);



// Rota para editar a prioridade de uma tarefa
main.put('/tarefas/:id/prioridade',
    [body('prioridade').isIn(['baixa', 'media', 'alta']).withMessage('Prioridade deve ser baixa, media ou alta')],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { prioridade } = req.body;
        const tarefa = tarefas.find(t => t.id === parseInt(id));
        if (!tarefa) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        tarefa.editarPrioridade(prioridade.toLowerCase());
        res.json(tarefa);
    }
);



// Rota para concluir uma tarefa
main.patch('/tarefas/:id/concluir', (req, res) => {
    const { id } = req.params;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    tarefa.marcarComoConcluida();
    res.json(tarefa);
})



// Rota para deletar uma tarefa
main.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const index = tarefas.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    tarefas.splice(index, 1);
    res.status(204).send();
});



// Rota para buscar por id
main.get('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
});

// onde vai rodar o servidor
main.listen(3444, () => {
    console.log("Servidor rodando na porta 3444");
});

/*sobre as validacoes:
elas tinham que ser aplicadas nas rotas que recebem dados do usuário 
no corpo da requisição (body)

as rotas são:
- POST /tarefas
- PUT /tarefas/:id/titulo
- PUT /tarefas/:id/descricao
- PUT /tarefas/:id/dataCriacao
- PUT /tarefas/:id/prioridade
- PATCH /tarefas/:id/concluir
obs: a rota de deletar não precisa de validação, pois não recebe dados do usuário
a rota de buscar por id também não precisa de validação, pois o id é passado na url
*/