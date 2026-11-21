import {
    cirarDocumento,
    buscarDocumento,
    buscarDocumentoPorCliente,
    buscarDocumentosVencidos,
    atualizarDocumento,
    deletarDocumento,
    type Documento,
} from './documento'

import { AppError } from '../errors/AppError'
export function cirarDocumentoService(dadosDocumento: Documento): Documento[] {
    const documento = cirarDocumento(dadosDocumento)
    if (!documento) {
        throw new AppError('documento já cadastrado', 409)
    }
    return documento
}


export function buscarDocumentoService(): Documento [] {
    const documento  = buscarDocumento()
    if (!documento) {
        throw new AppError('documento não encontrado', 404)
    }
    return  documento
}

export function buscarDocumentoClienteService(id: number): Documento [] {
    let documento = buscarDocumentoPorCliente(id)
    if (!documento) {
        throw new AppError('documento não encontrado', 404)
    }
    return documento
}
export function buscarDocumentoVencidoService(): Documento[] {
    const documento = buscarDocumentosVencidos()
    if (!documento) {
        throw new AppError('documento não encontrado', 404)
    }
    return documento
}

export function atualizaDocumentoService(id: number, dadosDocumento: Documento): string {
    const documento = atualizarDocumento(id)
    if (!documento) {
        throw new AppError('Cliente não encontrado', 404)
    }
    return documento
}

export function deleteDocumentoService(id: number): boolean {
    const documento = deletarDocumento(id)
    if (!documento) {
        throw new AppError('Cliente não encontrado', 404)
    }
    return true
}
