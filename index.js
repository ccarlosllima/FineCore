import { readFile } from "fs/promises"

async function lerCNAB() {
    const dados = await readFile('./cnab.txt', 'utf-8')
    const linhas = dados.split("\n")
    let total = 0
    for (const linha of linhas) {
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
    return total
}

lerCNAB()
    .then((total) => {
        console.log("valor total:", total)
        console.log('arquivo lido')
    })
    .catch(() => {
        console.log("Arquivo não encontrado ")
    })


console.log('Fim do programa')



