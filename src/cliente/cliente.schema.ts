import * as z from "zod"

export const clienteSchema = z.object({
    name: z.string('O formato informado é inválido'),
    limit: z.number('Deve ser informado apenas numeros'),
})

export const atualizarClienteSchema = z.object({
    name: z.string().optional(),
    limit: z.number('Esperado um numero').optional(),
    ativo: z.boolean().optional()
})

export function validaErroSchema(resultado: { success: boolean, error?: any}) {
    if (!resultado.success) {
        return {
            erro: 'Dados inválidos',
            detalhes: z.flattenError(resultado.error).fieldErrors
        }
    }
    return null
}
