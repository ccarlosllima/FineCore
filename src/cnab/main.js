import { readdir } from "fs/promises"
import path from "path"

async function processarPasta(pasta) {
    const arquivos = await readdir(pasta)
    for (const arquivo of arquivos) {
        if (!arquivo.endsWith(".txt")) {
            continue
        }
        const caminho = path.resolve(
            path.join(pasta, arquivo)
        )
       console.log('Processando o arquivo ', caminho)
    }
}


processarPasta('arquivo')
