export class AppError extends Error {
    constructor(
        menssage: string,
        public statusCode : number
    ){
        super(menssage)
        this.name = 'AppError'
    }
}