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

export function cirarDocumento(documento: Documento): Documento[] {
    let arrayDocumento = []
    arrayDocumento.push(documento)
    return arrayDocumento
}

export function buscarDocumento(): Documento[] {
    const documento1 = new Documento(1, 2, 'carlos lima', 5224, '12-07-2026', true)
    return [documento1]
}

export function buscarDocumentoId(id: number) {
        const registros = [
        {
            id: 1, codigo: 2,
            nome: 'Carlos Lima',
            valor: 5224,
            data: '12-07-2026',
            ativo: true
        },
        {
            id: 2,
            codigo: 3,
            nome: 'João Silva',
            valor: 6841,
            data: '15-07-2026',
            ativo: false
        },
        {
            id: 3,
            codigo: 4,
            nome: 'Maria Santos',
            valor: 7125,
            data: '18-07-2026',
            ativo: true
        },
        {
            id: 4,
            codigo: 5,
            nome: 'Pedro Costa',
            valor: 8932,
            data: '20-07-2026',
            ativo: true
        },
        {
            id: 5,
            codigo: 6,
            nome: 'Ana Oliveira',
            valor: 4567,
            data: '25-07-2026',
            ativo: false
        }
    ];

    const documento = registros.find(element => element.id === id)
    return documento
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

