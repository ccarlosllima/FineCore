import {
    deleteCliente,
    atualizarCliente,
    buscarCliente,
    buscarClientes,
    crearCliente,
    type DadosCriacaoCliente,
    type Cliente,
    DadosAtualizacaoCliente
}
    from './cliente'

export function crearClienteService(dadosCliente: DadosCriacaoCliente): Cliente | null {
    return crearCliente(dadosCliente)
}

export function buscarClienteService(id: number): Cliente | null {
    return buscarCliente(id)
}

export function buscarClientesService(): Cliente[] {
    return buscarClientes()
}

export function atualizaClienteService(id: number, dadosCliente: DadosAtualizacaoCliente): Cliente | null {
    return atualizarCliente(id, dadosCliente)
}

export function deleteClienteService(id: number): boolean | null {

    return deleteCliente(id)
}
