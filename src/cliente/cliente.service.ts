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

import { AppError } from '../errors/AppError'

export function crearClienteService(dadosCliente: DadosCriacaoCliente): Cliente {
    const Cliente = crearCliente(dadosCliente)
    if (!Cliente) {
        throw new AppError('Cliente já cadastrado', 409)
    }
    return Cliente
}

export function buscarClienteService(id: number): Cliente {
    const Cliente =  buscarCliente(id)
    if(!Cliente){
        throw new AppError('Cliente não encontrado', 404)
    }
    return Cliente
}

export function buscarClientesService(): Cliente[] {
    return buscarClientes()
}

export function atualizaClienteService(id: number, dadosCliente: DadosAtualizacaoCliente): Cliente {
    const Cliente = atualizarCliente(id, dadosCliente)
      if (!Cliente) {
       throw new AppError('Cliente não encontrado', 404)
    }
    return Cliente
}

export function deleteClienteService(id: number): void {

    if(!deleteCliente(id)){
        throw new AppError('Cliente não encontrado', 404)
    }
}
