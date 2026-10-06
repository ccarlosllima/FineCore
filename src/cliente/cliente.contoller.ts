import type { Request, Response } from 'express'
import { atualizarClienteSchema, clienteSchema, validaErroSchema } from './cliente.schema';
import {
    crearClienteService,
    atualizaClienteService,
    buscarClienteService,
    buscarClientesService,
    deleteClienteService
} from './cliente.service';

function obterId(req: Request): number | null {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return null
    }
    return id
}


export function criarClienteController(req: Request, res: Response) {
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
    if (clienteId === null) {
        return res.status(400).json({
            erro: "O id deve ser um numero"
        })
    }

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
    if (clienteId === null) {
        return res.status(400).json({
            erro: "O id deve ser um numero"
        })
    }
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
    if (clienteId === null) {
        return res.status(400).json({
            erro: "O id deve ser um numero"
        })
    }

    const cliente = deleteClienteService(clienteId)
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    return res.sendStatus(204)
}
