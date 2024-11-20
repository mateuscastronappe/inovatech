export type ArmazenamentoEnergia = {
    codigo: number;
    tipo: string;
    capacidade: number;
    custo: number;
}

export type EnergiaGerada = {
    codigo: number;
    quantidade: number;
    tipoFonte: string;
    dataGeracao: string;
}

export type Feedback = {
    codigo: number;
    comentario: string;
    nota: number;
    dataFeedback: string;
}

export type Fonte = {
    codigo: number;
    tipo: string;
    capacidade: number;
    localizacao: string;
    descricao: string;
}

export type Monitoramento = {
    codigo: number;
    nomeDaFonte: string;
    status: string;
    energiaGerada: number;
    observacao: string;
}

export type ProjetoSustentavel = {
    codigo: number;
    descricao: string;
    custo: number;
    status: string;
}

export type RedeInteligente = {
    codigo: number;
    nome: string;
    eficienciaDistribuicao: number;
    perdaEnergia: number;
}

export type RegiaoSustentavel = {
    codigo: number;
    nomeRegiao: string;
    populacao: number;
    energiaRenovavel: number;
}

export type TecnologiaRenovavel = {
    codigo: number;
    nome: string;
    tipoFonte: string;
    eficiencia: number;
    custoProducao: number;
}

export type Usuario = {
    codigo: number;
    nome: string;
    cpf: string;
    email: string;
}