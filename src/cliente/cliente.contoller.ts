import type { Request, Response } from 'express'
import { atualizarClienteSchema, clienteSchema, validaErroSchema } from './cliente.schema';
import {
    crearClienteService,
    atualizaClienteService,
    buscarClienteService,
    buscarClientesService,
    deleteClienteService
} from './cliente.service';

function obterId(req: Request): number {
    return Number(req.params.id)
}


export function criarClienteController(req: Request, res: Response,) {
    const resultado = clienteSchema.safeParse(req.body)
    if (!resultado.success) {
        return res.status(400).json(validaErroSchema(resultado))
    }
    const cliente = crearClienteService(resultado.data)

    if (!cliente) {
        return res.status(409).json({
            erro: 'Cliente já cadastrado'
        })
    }

    return res.status(201).json(cliente)
}

export function buscarClienteController(req: Request, res: Response) {
    const clienteId = obterId(req)
    const cliente = buscarClienteService(clienteId)
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    res.status(200).json(cliente)
}

export function buscarClientesController(req: Request, res: Response) {
    const clientes = buscarClientesService()
    return res.status(200).json(clientes)
}

export function atualizaClienteController(req: Request, res: Response) {
    const clienteId = obterId(req)
    const resultado = atualizarClienteSchema.safeParse(req.body)
    if (!resultado.success) {
        return res.status(400).json(validaErroSchema(resultado))
    }
    const cliente = atualizaClienteService(clienteId, resultado.data)
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    res.status(200).json(cliente)
}

export function deleteClienteController(req: Request, res: Response) {
    const clienteId = obterId(req)
    const cliente = deleteClienteService(clienteId)
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    return res.sendStatus(204)
}
