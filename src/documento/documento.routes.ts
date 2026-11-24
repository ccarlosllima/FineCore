import { Router } from "express";
import {middlewareValidation} from "./documento.middlware"
import {
    cirarDocumentoController,
    buscarDocumentosController,
    buscarDocumentoPorClienteController,
    buscarDocumentoVencidoController,
    buscarDocumentoController,
    editarDocumentoController,
    deleterDocumentoController
} from "./documento.controller";
const router = Router()
//GET
router.get('/documento', buscarDocumentosController)
router.get('/documento/:id', buscarDocumentoController)
router.get('/documentoVencido', buscarDocumentoVencidoController)
router.get('/clientes/:id/documentos', buscarDocumentoPorClienteController)
//===============================================================

//POST
router.post('/documento', cirarDocumentoController)
//================================================================

//PATCH
router.patch('/documento/:id', editarDocumentoController)
//================================================================

//DELET
router.delete('/documento/:id', deleterDocumentoController)
//================================================================


export default router