import { Router } from "express";
import {
    cirarDocumentoController,
    buscarDocumentosController,
    buscarDocumentoClienteController,
    buscarDocumentoVencidoController,
    editarDocumentoController,
    deleterDocumentoController
} from "./documento.controller";
const router = Router()

router.post('/documento', cirarDocumentoController)
router.get('/documento', buscarDocumentosController)
router.get('/documentoCliente', buscarDocumentoClienteController)
router.get('/documentoVencido', buscarDocumentoVencidoController)
router.patch('/documento/:id', editarDocumentoController)
router.delete('/documento/:id', deleterDocumentoController)


export default router