import {readdir, readFile } from "fs/promises"
import path from "path"

async function lerCNAB(pasta, arquivo) {
    const caminhoArquivo = path.resolve(
        path.join(pasta,arquivo)
    )
    const dados = await readFile(caminhoArquivo, 'utf-8')
    const linhas = dados.split("\n")
    let total = 0
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
        // console.log(dadosCliente)
    }
    return total
}

let pasta = './arquivo'
let fileName = 'cnab.txt'

const arquivos = await readdir(pasta)

console.log(arquivos)

lerCNAB(pasta, fileName)
    .then((total) => {
        console.log("valor total:", total)
        console.log('arquivo lido')
    })
    .catch((err) => {
        console.log("Deu ruim: ", err)
    })


console.log('Fim do programa')



