import express, { type Express, type Request, type Response } from 'express';
import * as z from "zod"

import { 
    buscarCliente, 
    crearCliente, 
    buscarClientes, 
    atualizarCliente, 
    deleteCliente
} from './src/cliente/cliente';

const app: Express = express();
app.use(express.json())

const clienteSchema = z.object({
    name: z.string('O formato informado é inválido'),
    limit: z.number('Deve ser informado apenas numeros'),
})

const atualizarClienteSchema = z.object({
    name: z.string().optional(),
    limit: z.number().optional(),
    ativo: z.boolean().optional()
})

app.get('/cliente/:id', (req: Request, res: Response) => {
    const clientId = Number(req.params.id)
    if (isNaN(clientId)) {
        return res.status(400).json({ erro: 'O ID deve ser um numero' })
    }
    const cliente = buscarCliente(clientId)
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    res.status(200).json(cliente)
});

app.get('/clientes', (req: Request, res: Response) => {
    const cliente = buscarClientes()
    res.status(200).json(cliente)
});


app.post('/cliente', (req: Request, res: Response) => {
    const resultado = clienteSchema.safeParse(req.body)

    if (!resultado.success) {
        return res.status(400).json({
            erro: 'Dados inválidos',
            detalhes: z.flattenError(resultado.error).fieldErrors
        })
    }

    const cliente = crearCliente(resultado.data)

    if (!cliente) {
        return res.status(409).json({
            erro: 'Cliente já cadastrado'
        })
    }

    return res.status(201).json(cliente)
})

app.patch('/cliente/:id', (req: Request, res: Response) => {
    const clientId = Number(req.params.id)
    if (isNaN(clientId)) {
        return res.status(400).json({ erro: 'O ID deve ser um numero' })
    }

    const resultado = atualizarClienteSchema.safeParse(req.body)

    if (!resultado.success) {
        return res.status(400).json({
            erro: 'Dados inválidos',
            detalhes: z.flattenError(resultado.error).fieldErrors
        })
    }
    const dados = resultado.data
    const cliente = atualizarCliente(clientId, dados)
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    res.status(200).json(cliente)
});

app.delete('/cliente/:id', (req: Request, res: Response) => {
    const clientId = Number(req.params.id)
    if (isNaN(clientId)) {
        return res.status(400).json({ erro: 'O ID deve ser um numero' })
    }
    const cliente = deleteCliente(clientId)
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' })
    }
    return res.sendStatus(204)
})

app.listen(8000);
console.log('Servidor rodando na porta: 8000')

