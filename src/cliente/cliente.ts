interface ClienteInterface {
    id: number,
    name: string,
    limit: number,
    ativo: boolean
}

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

export function crearCliente(cliente: Cliente) : Cliente | null {
    if (cliente.name === 'pedro') {
        return null
    }
    return cliente
}