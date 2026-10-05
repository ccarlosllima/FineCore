import * as z from "zod"

export const clienteSchema = z.object({
    name: z.string('O formato informado é inválido'),
    limit: z.number('Deve ser informado apenas numeros'),
})

export const atualizarClienteSchema = z.object({
    name: z.string().optional(),
    limit: z.number().optional(),
    ativo: z.boolean().optional()
})
