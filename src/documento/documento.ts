interface DocumentoInterface {
    id: number
    clienteId: number
    sacado: string
    valor: number
    vencimento: string
    pago: boolean
}

export class Documento implements DocumentoInterface {
    constructor(
        public id: number,
        public clienteId: number,
        public sacado: string,
        public valor: number,
        public vencimento: string,
        public pago: boolean,
    ) { }
}

export function buscarDocumento(): Documento[] {
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
export function buscarDocumentoPorCliente(clienteId: number): Documento[] {
    const documentos = buscarDocumento()
    const documentosCliente = documentos.filter(doc =>
        doc.clienteId === clienteId
    )
    return documentosCliente
}


export function buscarDocumentosVencidos(): Documento[] {
    const documentos = buscarDocumento()
    const hoje = new Date()
    hoje.setHours(0,0,0,0)

    const documentosVencidos = documentos.filter(doc =>{ 
        const [dia, mes, ano] = doc.vencimento.split('-').map(Number)
        const dataVencimento = new Date(ano, mes-1, dia)
        
        return dataVencimento < hoje && doc.pago === false
    })

    return documentosVencidos
}
