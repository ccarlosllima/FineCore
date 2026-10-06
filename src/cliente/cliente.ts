interface ClienteInterface {
    id: number,
    name: string,
    limit: number,
    ativo: boolean
}

type DadosCriacaoCliente = Omit<ClienteInterface, "id" | "ativo">
type DadosAtualizacaoCliente = Partial<Omit<ClienteInterface, "id">>

class Cliente implements ClienteInterface {
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

export function buscarClientes(): Cliente[] {
    const clientes = [
        {
            id: 1,
            name: 'Carlos',
            limit: 500,
            ativo: true
        },
        {
            id: 2,
            name: 'Pamela',
            limit: 1500,
            ativo: true
        },
        {
            id: 3,
            name: 'Maria Clara',
            limit: 500,
            ativo: true
        }, {
            id: 4,
            name: 'Ana Bastos',
            limit: 500,
            ativo: true
        }
    ]

    return clientes
}

export function crearCliente(cliente: DadosCriacaoCliente): Cliente | null {
    if (cliente.name === 'pedro') {
        return null
    }
    console.log(cliente)
    
    return new Cliente(
        30,
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
