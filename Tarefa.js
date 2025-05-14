class Tarefa {
    constructor(titulo, descricao, dataCriacao, prioridade, dataConclusao = null) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataCriacao = dataCriacao;
        this.prioridade = prioridade; // "baixa", "media", "alta"
        this.dataConclusao = dataConclusao;
    }

    marcarComoConcluida() {
        this.dataConclusao = new Date();
        return this;
    }

    editarDataCriacao(dataCriacao) {
        this.dataCriacao = dataCriacao;
        return this;
    }

    editarTitulo(titulo) {
        this.titulo = titulo;
        return this;
    }

    editarDescricao(descricao) {
        this.descricao = descricao;
        return this;
    }

    editarPrioridade(prioridade) {
        this.prioridade = prioridade;
        return this;
    }

    toJSON() {
        return {
            titulo: this.titulo,
            descricao: this.descricao,
            dataCriacao: this.dataCriacao,
            prioridade: this.prioridade,
            dataConclusao: this.dataConclusao
        };
    }
}

export default Tarefa; //para poder ser acessada em outros arquivos
