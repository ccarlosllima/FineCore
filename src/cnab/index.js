import { readdir, readFile } from "fs/promises"
import path from "path"

async function processarCnab(files) {
    const dadosCnab = (await Promise.all(
        files.map(file => readFile(file, 'utf-8'))
    )).map(dados => dados.split("\n"))
    
    let total = 0
    for (const linhas of dadosCnab) {
        for (const linha of linhas) {
            if (linha === "") {
                continue
            }
            const dadosLinha = linha.split("|")
            const dadosCliente = {
                "codigo": dadosLinha[0],
                "cliente": dadosLinha[1],
                "tipoPessoa": dadosLinha[2],
                "valor": Number(dadosLinha[3])
            }
            total += dadosCliente.valor
            console.log(dadosCliente)
        }
    }
    return total

}


async function obterArquivos(pasta) {
    let files = []
    const arquivos = await readdir(pasta) //obtem os arquivos da 

    for (const arquivo of arquivos) {
        if (!arquivo.endsWith(".txt")) {
            continue
        }
        const caminho = path.resolve(
            path.join(pasta, arquivo)
        )
        files.push(caminho) //devolve o arquivo
    }
    return files
}


let file = await obterArquivos('arquivo2')
processarCnab(file)
    .then(total => {
        console.log("Valor total:", total)
    })
    .catch(err => {
        console.log("Deu ruim:", err)
    })




