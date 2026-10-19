import type { Request, Response, NextFunction } from 'express'

export function middlewareValidation (req:Request, res:Response, next :NextFunction){
     const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({erro: "O id deve ser um numero"})
    }
    next()

}