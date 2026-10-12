
const titulo = document.querySelector('#titulo');
titulo.textContent = 'Blog do Gustavo';

////////////////////////////////////////////////////

const paragrafos = document.querySelectorAll('.texto')
for (const item of paragrafos) {
    console.log(item.textContent)
}

///////////////////////////////////////////////////////

const lista = document.querySelector('#lista');
lista.innerHTML = '<p>Primeiro item</p> <p>Segundo item</p>'

/////////////////////////////////////////////////////////////

const li = document.createElement('li')
li.textContent = 'Terceiro Item'
lista.append(li)

/////////////////////////////////////////////////////////////

li.classList.add('destaque')

/////////////////////////////////////////////////////////////

console.log(li.classList.contains('destaque'))

/////////////////////////////////////////////////////////////

const tarefas = ["Estudar JS", "Fazer exercícios", "Revisar DOM"]

for (const item of tarefas) {
    const li = document.createElement('li')
    li.classList.add('NovaLi')
    li.textContent = item

    lista.append(li)
}

document.querySelector('.NovaLi').className = 'feito'

console.log(document.querySelectorAll('li').length)

////////////////////////////////////////////////////////////////

const botao = document.querySelector('#botao')
botao.addEventListener('click', () => console.log('Clicou!'))

/////////////////////////////////////////////////////////////

botao.addEventListener('mouseover', () => botao.textContent = 'Pode Clicar!')

///////////////////////////////////////////////////////////////////////////////

const nome = document.querySelector('#nome')
nome.addEventListener('keyup', () => console.log(nome.value))

////////////////////////////////////////////////////////////////////////////////

lista.addEventListener("click",  
    (e) => {if (e.target.tagName === "LI")
        {console.log(e.target.textContent); e.target.classList.toggle("feito")
    }})

const li_nova = document.createElement('li')
li_nova.textContent = 'HTML CSS'
lista.append(li_nova)

//////////////////////////////////////////////////////////////////////////////

const tarefa = document.querySelector('#tarefa')

const formulario = document.querySelector('#formulario')
formulario.addEventListener('submit', (e) => {if (tarefa.value != '') {
    e.preventDefault();
    const li = document.createElement('li'); li.textContent = tarefa.value.trim(); lista.append(li);
    tarefa.value = '';
}})

