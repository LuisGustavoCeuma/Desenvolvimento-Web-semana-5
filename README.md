# Desenvolvimento-web-semana-4

Blog do Gustavo

Este projeto está dividido no arquivo bloco 1.js, que pratica os métodos de array, e o par index.html e app.js, que pratica a manipulação do DOM com uma pequena lista de tarefas.

Nos métodos de array, usei forEach para percorrer uma lista e executar uma ação em cada item, como imprimir uma saudação no console, sem devolver nada. O map serve para transformar cada item e gerar um novo array do mesmo tamanho, por exemplo para colocar nomes em maiúsculas ou extrair só o nome de cada produto. O filter cria um novo array apenas com os itens que atendem a uma condição, como os preços acima de 20. Já o reduce junta todos os itens em um único valor, que aqui é a soma dos preços, e pode ser combinado com o map para somar uma propriedade específica dos objetos.

Na parte do DOM, o código seleciona elementos com querySelector e querySelectorAll, altera textos com textContent e innerHTML, cria elementos novos com createElement e os insere na página com append. As classes são controladas com classList, que permite adicionar, alternar e verificar estilos como destaque e feito. Também há eventos de clique, de mouse, de teclado e de envio do formulário, que adiciona na lista a tarefa digitada e limpa o campo.

O ponto mais importante do projeto é o Event Delegation. Em vez de registrar um evento de clique em cada li, coloquei um único listener na ul e uso e.target para descobrir qual item foi clicado. Isso aproveita o fato de que o evento sobe pela árvore do DOM até chegar à lista. Com isso, o código usa menos listeners, o que ajuda na performance, e os itens criados depois, seja pelo formulário ou por append, já respondem ao clique sem precisar de nenhum registro extra.
