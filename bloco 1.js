

//  forEach e map

const nomes = ['Pedro', 'Joao', 'Gustavo']

nomes.forEach(nome => console.log(`Olá, ${nome.toUpperCase()}`))

const nomes_upper = nomes.map(nome => nome.toUpperCase())

console.log(nomes_upper)

///////////////////////////////////////////////////////////////////

// filter e reduce

const precos = [10, 25, 40, 5, 60]

const precos_acima_de_20 = precos.filter(preco => preco > 20)

console.log(precos_acima_de_20)

const valor_total = precos_acima_de_20.reduce((total, preco) => total += preco)

console.log(valor_total)

//////////////////////////////////////////////////////////////////

// map, reduce, forEach e filter

const produtos = [
    {
        nome: 'Caderno',
        preco: 60
    },
    {
        nome: 'Borracha',
        preco: 45
    },
    {
        nome: 'Caneta',
        preco: 52
    }
];

const nomes_dos_produtos = produtos.map(produto => produto.nome)
console.log(nomes_dos_produtos)

const produtos_menor_que_50 = produtos.filter(produto => produto.preco < 50)
console.log(produtos_menor_que_50)

const preco_total = produtos.map(produto => produto.preco).reduce((total, preco) => total += preco)
console.log(preco_total)

produtos.forEach((produtos) => console.log(`${produtos.nome}: R$${produtos.preco}`))

