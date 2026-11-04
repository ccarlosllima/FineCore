import type { Request, Response } from 'express'
import { calculaOffSet } from './cliente.service';
import { atualizarClienteSchema, clienteSchema, validaErroSchema } from './cliente.schema';
import {
    crearClienteService,
    atualizaClienteService,
    buscarClienteService,
    buscarClientesService,
    deleteClienteService
} from './cliente.service';

interface Pagination  {
    page: number
    limit: number
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

    const {page, limit} = res.locals.pagination as Pagination   
 
    const clientes = buscarClientesService(page, limit)
    return res.status(200).json(clientes)
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
    const cliente = deleteClienteService(clienteId)
    return res.sendStatus(204)
}
