/*
type Amostra = {
    x: number,
    y: number
}

class RegressaoLinear {
    private inclinacao = 0;
    private intercepto = 0;

    treinar(dados: Amostra[]): void {
        if (dados.length < 2) {
            throw new Error('precisamos de no minimo 2 paramtros')
        }

        const mediaX = dados.reduce((soma, item) => soma + item.x, 0) / dados.length;
        const mediaY = dados.reduce((soma, item) => soma + item.y, 0) / dados.length;

        let numerador = 0;
        let denominador = 0;

        for (const item of dados) {
            numerador += (item.x - mediaX) * (item.y - mediaY);
            denominador += (item.x - mediaX) ** 2;

        }

        if (denominador === 0) {
            throw new Error("Os valores de entrada precisam variar")
        }

        this.inclinacao = numerador / denominador;
        this.intercepto = mediaY - this.inclinacao * mediaX;

    }

    prever(x: number): number{
        return this.inclinacao + this.inclinacao * x
    }
}

const dados: Amostra[] = [
    { x: 1, y: 5 }, 
    { x: 2, y: 7 },
    { x: 3, y: 8 },
    { x: 4, y: 11 },
    { x: 5, y: 12 },
];

const modelo = new RegressaoLinear()
modelo.treinar(dados)

const entrada = 6

const previsao = modelo.prever(entrada)
console.log("Entrada:", entrada);
console.log("Previsão:", previsao.toFixed(2));

*/


type Amostra = {
  x: number;
  y: number;
};

class RegressaoLinear {
  private inclinacao = 0;
  private intercepto = 0;

  treinar(dados: Amostra[]): void {
    if (dados.length < 2) {
      throw new Error("Precisamos de pelo menos 2 amostras.");
    }

    const mediaX =
      dados.reduce((soma, item) => soma + item.x, 0) /
      dados.length;

    const mediaY =
      dados.reduce((soma, item) => soma + item.y, 0) /
      dados.length;

    let numerador = 0;
    let denominador = 0;

    for (const item of dados) {
      numerador += (item.x - mediaX) * (item.y - mediaY);
      denominador += (item.x - mediaX) ** 2;
    }
    
    if (denominador === 0) {
      throw new Error("Os valores de entrada precisam variar.");
    }

    this.inclinacao = numerador / denominador;
    this.intercepto = mediaY - this.inclinacao * mediaX;
  }

  
  avaliar(dados: Amostra[]): number {
    if (dados.length === 0) {
      throw new Error("Informe pelo menos uma amostra.");
    }

    const somaDosErrosQuadrados = dados.reduce(
      (soma, item) => {
        const previsao = this.prever(item.x);
        const erro = item.y - previsao;

        return soma + erro ** 2;
      },
      0
    );

    return somaDosErrosQuadrados / dados.length;
  }

  prever(x: number): number {
    return this.intercepto + this.inclinacao * x;
  }
}

const dados: Amostra[] = [
  { x: 1, y: 5 },
  { x: 2, y: 7 },
  { x: 3, y: 8 },
  { x: 4, y: 11 },
  { x: 5, y: 12 },
];

const modelo = new RegressaoLinear();

modelo.treinar(dados);
console.log(
  "Erro quadrático médio:",
  modelo.avaliar(dados).toFixed(2)
);

const entrada = 6;
const previsao = modelo.prever(entrada);

console.log("Entrada:", entrada);
console.log("Previsão:", previsao.toFixed(2));
