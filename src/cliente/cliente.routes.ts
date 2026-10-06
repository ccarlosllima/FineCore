import { Router} from "express";
import {
    criarClienteController,
    atualizaClienteController,
    buscarClienteController,
    buscarClientesController,
    deleteClienteController

} from "./cliente.contoller";

const router = Router()

router.get('/clientes', buscarClientesController) 
router.get('/cliente/:id', buscarClienteController)
router.post('/cliente', criarClienteController)
router.patch('/cliente/:id', atualizaClienteController)
router.delete('/cliente/:id', deleteClienteController)

export default router