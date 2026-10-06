import { Router, type Request, type Response } from "express";
import { atualizarClienteSchema, clienteSchema, validaErroSchema } from './cliente.schema';
import {
    buscarClientes,
    buscarCliente,
    atualizarCliente,
    crearCliente,
    deleteCliente
} from "./cliente";

const router = Router()
function obterId(req: Request): number | null {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return null
    }
    return id
}

router.get('/clientes', (req: Request, res: Response) => {
    const clientes = buscarClientes()
    return res.status(200).json(clientes)
})

router.get('/cliente/:id', (req: Request, res: Response) => {
    const clienteId = obterId(req)
    if (clienteId === null) {
        return res.status(400).json({
            erro: "O id deve ser um numero"
        })
    }

    const cliente = buscarCliente(clienteId)
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    res.status(200).json(cliente)
});

router.post('/cliente', (req: Request, res: Response) => {
   
    const resultado = clienteSchema.safeParse(req.body)
    if(!resultado.success){
        return res.status(400).json(validaErroSchema(resultado))
    }
    const cliente = crearCliente(resultado.data)

    if (!cliente) {
        return res.status(409).json({
            erro: 'Cliente já cadastrado'
        })
    }

    return res.status(201).json(cliente)
})

router.patch('/cliente/:id', (req: Request, res: Response) => {
    const clienteId = obterId(req)
    if (clienteId === null) {
        return res.status(400).json({
            erro: "O id deve ser um numero"
        })
    }
    const resultado = atualizarClienteSchema.safeParse(req.body)

   if(!resultado.success){
    return res.status(400).json(validaErroSchema(resultado))
   }

    const cliente = atualizarCliente(clienteId, resultado.data)

    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    res.status(200).json(cliente)
});

router.delete('/cliente/:id', (req: Request, res: Response) => {

    const clienteId = obterId(req)
    if (clienteId === null) {
        return res.status(400).json({
            erro: "O id deve ser um numero"
        })
    }

    const cliente = deleteCliente(clienteId)
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    return res.sendStatus(204)
})

export default router