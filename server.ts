import express, { type Express } from 'express';
import { errorMiddleware } from './src/error.middleware';
import clientRouter from './src/cliente/cliente.routes';
import documentoRouter from './src/documento/documento.routes'


const app: Express = express();

app.use(express.json())

app.use(clientRouter)
app.use(documentoRouter)

app.use(errorMiddleware)
app.listen(8000);
console.log('Servidor rodando na porta: 8000')




