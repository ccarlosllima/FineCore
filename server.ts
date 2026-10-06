import express, { type Express } from 'express';

import router from './src/cliente/cliente.routes';


const app: Express = express();

app.use(express.json())
app.use(router)

app.listen(8000);
console.log('Servidor rodando na porta: 8000')




