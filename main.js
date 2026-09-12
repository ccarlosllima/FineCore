const arquivos = [
  "retorno_001.txt",
  "retorno_002.txt",
  "retorno_003.txt",
  "imagem.png",
  "audio.avg",
  "foto.gpeg"
]

for (const arquivo of arquivos) {
    // if (arquivo.slice(-4) !== ".txt") {
    //     continue
    // }

    if (!arquivo.endsWith(".txt")) {
        continue
    }
    console.log(arquivo)
}