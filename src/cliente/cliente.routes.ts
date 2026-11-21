import { Router} from "express";
import { middlewareValidation, middlewarePaginationValidation } from './cliente.middleware' 
import {
    criarClienteController,
    atualizarClienteController,
    buscarClienteController,
    buscarClientesController,
    deletetarClienteController

} from "./cliente.contoller";

const router = Router()

router.get('/clientes', middlewarePaginationValidation, buscarClientesController) 
router.get('/cliente/:id',middlewareValidation, buscarClienteController)
router.post('/cliente', criarClienteController)
router.patch('/cliente/:id',middlewareValidation, atualizarClienteController)
router.delete('/cliente/:id',middlewareValidation, deletetarClienteController)

export default router