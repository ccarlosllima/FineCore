import type { Request, Response, NextFunction } from 'express'

export function middlewareValidation(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "O id deve ser um numero" })
    }
    next()

}

export function middlewarePaginationValidation(req: Request, res: Response, next: NextFunction) {
    const page = Number(req.query.page ?? 1)
    const limit = Number(req.query.limit ?? 10)
    const name = typeof req.query.name === 'string' ? req.query.name.trim() : undefined
    const ativoQuery = req.query.ativo

    if (
        ativoQuery !== undefined &&
        ativoQuery !== 'true' &&
        ativoQuery !== 'false'
    ) {
        return res.status(400).json({
            error: "Parâmetro ativo inválido"
        })
    }

    let ativo: boolean | undefined

    if (ativoQuery === 'true') {
        ativo = true
    }

    if (ativoQuery === 'false') {
        ativo = false
    }

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
        return res.status(400).json({ error: "Paramtros informado inválido" })
    }
    res.locals.pagination = { page, limit, name, ativo }
    next()
}