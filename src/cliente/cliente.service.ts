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
import type { ResultadoPaginacao } from './cliente'

export function crearClienteService(dadosCliente: DadosCriacaoCliente): Cliente {
    const Cliente = crearCliente(dadosCliente)
    if (!Cliente) {
        throw new AppError('Cliente já cadastrado', 409)
    }
    return Cliente
}

export function buscarClienteService(id: number): Cliente {
    const Cliente = buscarCliente(id)
    if (!Cliente) {
        throw new AppError('Cliente não encontrado', 404)
    }
    return Cliente
}

export function buscarClientesService(page: number, limit: number, name?: string, ativo?:boolean): ResultadoPaginacao {
    const offset = calculaOffSet(page, limit)
    return buscarClientes(offset, limit, name, ativo)
}

export function atualizaClienteService(id: number, dadosCliente: DadosAtualizacaoCliente): Cliente {
    const Cliente = atualizarCliente(id, dadosCliente)
    if (!Cliente) {
        throw new AppError('Cliente não encontrado', 404)
    }
    return Cliente
}

export function deleteClienteService(id: number): void {

    if (!deleteCliente(id)) {
        throw new AppError('Cliente não encontrado', 404)
    }
}
export function calculaOffSet(page: number, limit: number) {
    return (page - 1) * limit
}