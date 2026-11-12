import type { Request, Response } from 'express'
import { atualizarClienteSchema, clienteSchema, validaErroSchema } from './cliente.schema';
import {
    crearClienteService,
    atualizaClienteService,
    buscarClienteService,
    buscarClientesService,
    deleteClienteService
} from './cliente.service';

interface Pagination {
    page: number
    limit: number
    name: string
    ativo: boolean
}

function obterId(req: Request): number {
    return Number(req.params.id)
}


export function criarClienteController(req: Request, res: Response) {
    const resultado = clienteSchema.safeParse(req.body)
    if (!resultado.success) {
        return res.status(400).json(validaErroSchema(resultado))
    }
    const cliente = crearClienteService(resultado.data)
    return res.status(201).json(cliente)
}

export function buscarClienteController(req: Request, res: Response) {

    const clienteId = obterId(req)
    const cliente = buscarClienteService(clienteId)
    res.status(200).json(cliente)
}

export function buscarClientesController(req: Request, res: Response) {

    const { page, limit, name, ativo } = res.locals.pagination as Pagination
    const resutado = buscarClientesService(page, limit, name, ativo)
    const totalPages = Math.ceil(resutado.total / limit)

    return res.status(200).json({
        data: resutado.data,
        total: resutado.total,
        page: page,
        limit: limit,
        totalPages: totalPages
    })
}

export function atualizaClienteController(req: Request, res: Response) {
    const clienteId = obterId(req)
    const resultado = atualizarClienteSchema.safeParse(req.body)
    if (!resultado.success) {
        return res.status(400).json(validaErroSchema(resultado))
    }
    const cliente = atualizaClienteService(clienteId, resultado.data)
    return res.status(200).json(cliente)
}

export function deleteClienteController(req: Request, res: Response) {
    const clienteId = obterId(req)
    deleteClienteService(clienteId)
    return res.sendStatus(204)
}
