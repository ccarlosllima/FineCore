interface ClienteInterface {
    id: number,
    name: string,
    limit: number,
    ativo: boolean

}
export interface ResultadoPaginacao {
    data: Cliente[]
    total: number
}

export type DadosCriacaoCliente = Omit<ClienteInterface, "id" | "ativo">
export type DadosAtualizacaoCliente = Partial<Omit<ClienteInterface, "id">>

export class Cliente implements ClienteInterface {
    constructor(
        public id: number,
        public name: string,
        public limit: number,
        public ativo: boolean
    ) { }

}

export function aumentarLimit(cliente: Cliente, valor: number): void {
    cliente.limit += valor
}

export function buscarCliente(id: number): Cliente | null {
    if (id !== 1) {
        return null
    }
    return new Cliente(
        id,
        'carlos',
        5000,
        true
    )
}

export function buscarClientes(offset: number, limit: number, name?: string, ativo?: boolean): ResultadoPaginacao { 

    const clientes = [
        { id: 1, name: 'Carlos', limit: 500, ativo: false },
        { id: 2, name: 'Pamela', limit: 1500, ativo: true },
        { id: 3, name: 'Maria Clara', limit: 500, ativo: false },
        { id: 4, name: 'Ana Bastos', limit: 500, ativo: false },
        { id: 5, name: 'João Silva', limit: 1000, ativo: false },
        { id: 6, name: 'Mariana Costa', limit: 2000, ativo: false },
        { id: 7, name: 'Pedro Santos', limit: 500, ativo: false },
        { id: 8, name: 'Juliana Oliveira', limit: 1500, ativo: false },
        { id: 9, name: 'Lucas Ferreira', limit: 3000, ativo: false },
        { id: 10, name: 'Beatriz Almeida', limit: 500, ativo: true },
        { id: 11, name: 'Rafael Souza', limit: 1000, ativo: true },
        { id: 12, name: 'Camila Rodrigues', limit: 2500, ativo: true },
        { id: 13, name: 'Gabriel Lima', limit: 1500, ativo: true },
        { id: 14, name: 'Larissa Gomes', limit: 500, ativo: true },
        { id: 15, name: 'Felipe Martins', limit: 2000, ativo: true },
        { id: 16, name: 'Amanda Ribeiro', limit: 1000, ativo: true },
        { id: 17, name: 'Bruno Carvalho', limit: 3500, ativo: true },
        { id: 18, name: 'Isabela Mendes', limit: 500, ativo: true },
        { id: 19, name: 'Thiago Barros', limit: 1500, ativo: true },
        { id: 20, name: 'Letícia Cardoso', limit: 2500, ativo: true },
        { id: 21, name: 'Gustavo Rocha', limit: 1000, ativo: true },
        { id: 22, name: 'Fernanda Dias', limit: 500, ativo: true },
        { id: 23, name: 'Matheus Nunes', limit: 2000, ativo: true },
        { id: 24, name: 'Vitória Castro', limit: 1500, ativo: true },
        { id: 25, name: 'André Moreira', limit: 3000, ativo: true },
        { id: 26, name: 'Bianca Teixeira', limit: 500, ativo: true },
        { id: 27, name: 'Diego Lopes', limit: 1000, ativo: true },
        { id: 28, name: 'Natália Freitas', limit: 2500, ativo: true },
        { id: 29, name: 'Eduardo Batista', limit: 1500, ativo: true },
        { id: 30, name: 'Luana Monteiro', limit: 500, ativo: true },
        { id: 31, name: 'Vinícius Melo', limit: 2000, ativo: true },
        { id: 32, name: 'Carolina Pires', limit: 1000, ativo: true },
        { id: 33, name: 'Rodrigo Azevedo', limit: 3500, ativo: true },
        { id: 34, name: 'Sabrina Cunha', limit: 1500, ativo: true },
        { id: 35, name: 'Leonardo Campos', limit: 500, ativo: true },
        { id: 36, name: 'Priscila Andrade', limit: 2500, ativo: true },
        { id: 37, name: 'Daniel Vieira', limit: 1000, ativo: true },
        { id: 38, name: 'Gabriela Farias', limit: 2000, ativo: true },
        { id: 39, name: 'Marcelo Tavares', limit: 500, ativo: true },
        { id: 40, name: 'Renata Correia', limit: 1500, ativo: true },
        { id: 41, name: 'Alexandre Neves', limit: 3000, ativo: true },
        { id: 42, name: 'Débora Machado', limit: 1000, ativo: true },
        { id: 43, name: 'Caio Peixoto', limit: 500, ativo: true },
        { id: 44, name: 'Tatiane Ramos', limit: 2500, ativo: true },
        { id: 45, name: 'Henrique Duarte', limit: 1500, ativo: true },
        { id: 46, name: 'Jéssica Moraes', limit: 2000, ativo: true },
        { id: 47, name: 'Samuel Correia', limit: 500, ativo: true },
        { id: 48, name: 'Elaine Barbosa', limit: 1000, ativo: true },
        { id: 49, name: 'Igor Fernandes', limit: 3500, ativo: true },
        { id: 50, name: 'Mônica Reis', limit: 1500, ativo: true },
        { id: 51, name: 'Otávio Pinheiro', limit: 500, ativo: true },
        { id: 52, name: 'Cláudia Nascimento', limit: 2500, ativo: true },
        { id: 53, name: 'Fábio Guimarães', limit: 1000, ativo: true },
        { id: 54, name: 'Vanessa Leal', limit: 2000, ativo: true }
    ];

    let clientesFiltrado = clientes
    // filtra por nome

    if (name != undefined) {
        clientesFiltrado = clientesFiltrado.filter(cliente =>
            cliente.name.toLocaleLowerCase().includes(name.toLowerCase())
        )
    }
    if (ativo != undefined) {
        clientesFiltrado = clientesFiltrado.filter(cliente =>
            cliente.ativo === ativo
        )
    }
    const result = clientesFiltrado.slice(offset, offset + limit)
    return {
        data: result,
        total: clientesFiltrado.length
    }


}

export function crearCliente(cliente: DadosCriacaoCliente): Cliente | null {
    if (cliente.name === 'pedro') {
        return null
    }
    console.log(cliente)

    return new Cliente(
        37,
        cliente.name,
        cliente.limit,
        true
    )
}

export function atualizarCliente(id: number, dados: DadosAtualizacaoCliente): Cliente | null {
    if (id > 4) {
        return null
    }
    const dadosCliente = {
        id: 1,
        name: 'Carlos',
        limit: 500,
        ativo: true
    }

    if (dados.name !== undefined) {
        dadosCliente.name = dados.name
    }
    if (dados.limit !== undefined) {
        dadosCliente.limit = dados.limit
    }
    if (dados.ativo !== undefined) {
        dadosCliente.ativo = dados.ativo
    }

    return dadosCliente
}

export function deleteCliente(id: number): null | boolean {
    if (id !== 1) {
        return null
    }
    return true
}
