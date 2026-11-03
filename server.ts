import express, { type Express } from 'express';
import { errorMiddleware } from './src/error.middleware';
import router from './src/cliente/cliente.routes';


const app: Express = express();

app.use(express.json())
app.use(router)

app.use(errorMiddleware)
app.listen(8000);
console.log('Servidor rodando na porta: 8000')




