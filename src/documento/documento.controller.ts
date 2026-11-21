import type { Request, Response } from "express";
import { documentoSchema, validaErroSchema } from "./documento.schema";
import {
    cirarDocumentoService,
    buscarDocumentoClienteService,
    buscarDocumentoVencidoService,
    atualizaDocumentoService,
    deleteDocumentoService,
    buscarDocumentoService
} from './documento.service'

export function cirarDocumentoController(req: Request, res: Response) {
    const resultado = documentoSchema.safeParse(req.body)
    if (!resultado.success) {
        return res.status(400).json(validaErroSchema(resultado))
    }
    const documento = cirarDocumentoService(resultado.data)
    return res.status(201).json({ status: 'success', data: documento })
}

export function buscarDocumentosController(req: Request, res: Response) {
    const documento = buscarDocumentoService()
    return res.status(200).json(documento)
}

export function buscarDocumentoClienteController(req: Request, res: Response) {
    const id = 10
    const documento = buscarDocumentoClienteService(id)
    return  res.status(200).json(documento)
}

export function buscarDocumentoVencidoController(req: Request, res: Response) { 
    const documentos = buscarDocumentoVencidoService()
    return res.status(200).json(documentos)
}

export function editarDocumentoController(req:Request, res:Response) {
    const id = 1
    const dados = []
    const documento = atualizaDocumentoService(id,dados )
    return res.status(200).json(documento)
}

export function deleterDocumentoController(req:Request, res:Response){
    const id = 10
    deleteDocumentoService(id)
    return res.sendStatus(204)
}