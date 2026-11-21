interface DocumentoInterface {
    documentoId: number
    clienteId: number
    documentoNomeSacado: string
    documentoValor: number
    documentoDataVencimento: string
    pago: boolean
}

export class Documento implements DocumentoInterface {
    constructor(
        public documentoId: number,
        public clienteId: number,
        public documentoNomeSacado: string,
        public documentoValor: number,
        public documentoDataVencimento: string,
        public pago: boolean,
    ) { }
}

export function cirarDocumento(documento: Documento) : Documento [] {
    let arrayDocumento = []
    arrayDocumento.push(documento)
    return arrayDocumento
}

export function buscarDocumento(): Documento[] {
    const documento1 = new Documento(1, 2, 'carlos lima', 5224, '12-07-2026', true)
    return [documento1]
}

export function buscarDocumentoId(id: number): Documento[] {
    const documento1 = new Documento(1, 2, 'carlos lima', 5224, '12-07-2026', true)
    const documento2 = new Documento(2, 4, 'teresa lisbon', 1000, '12-11-2026', true)
    const documento3 = new Documento(3, 6, 'patrick jane', 2000, '10-08-2026', true)
    const documento4 = new Documento(4, 8, 'abbot lost', 3000, '10-01-2026', false)
    const documento5 = new Documento(5, 10, 'sho durant', 4000, '12-03-2027', false)

    return [
        documento1,
        documento2,
        documento3,
        documento4,
        documento5
    ]
}

export function buscarDocumentoPorCliente(clienteId: number): Documento [] {
    const documentos = buscarDocumento()
    const documentosCliente = documentos.filter(doc =>
        doc.clienteId === clienteId
    )
    return documentosCliente
}

export function buscarDocumentosVencidos(): Documento[] {
    const documentos = buscarDocumento()
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const documentosVencidos = documentos.filter(doc => {
        const [dia, mes, ano] = doc.documentoDataVencimento.split('-').map(Number)
        const dataVencimento = new Date(ano, mes - 1, dia)

        return dataVencimento < hoje && doc.pago === false
    })

    return documentosVencidos
    
}

export function atualizarDocumento(id: number) {
    const documento = buscarDocumentoId(id)
    return 'atualizado!'
}

export function deletarDocumento(id: number): null | boolean {
    if (id !== 1) {
        return null
    }
    return true
}

