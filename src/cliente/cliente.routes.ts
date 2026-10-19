import { Router} from "express";
import { middlewareValidation } from './cliente.middleware' 
import {
    criarClienteController,
    atualizaClienteController,
    buscarClienteController,
    buscarClientesController,
    deleteClienteController

} from "./cliente.contoller";

const router = Router()

router.get('/clientes', buscarClientesController) 
router.get('/cliente/:id',middlewareValidation, buscarClienteController)
router.post('/cliente', criarClienteController)
router.patch('/cliente/:id',middlewareValidation, atualizaClienteController)
router.delete('/cliente/:id',middlewareValidation, deleteClienteController)

export default router