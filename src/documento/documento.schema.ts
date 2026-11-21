import z from "zod";

export const documentoSchema = z.object({
    documentoId: z.number('Deve ser um numero'), 
    clienteId: z.number('O valor informado deve ser numérico'),
    documentoNomeSacado: z.string('Obrigatório informar o nome do sacado'),
    documentoValor: z.number('O valor deve ser numérico'),
    documentoDataVencimento: z.string('Data inválida'),
    pago: z.boolean('Valor informado é inválido')
})


export function validaErroSchema(resultado: { success: boolean, error?: any}) {
    if (!resultado.success) {
        return {
            error: 'Dados inválidos',
            detalhes: z.flattenError(resultado.error).fieldErrors
        }
    }
    return null
}