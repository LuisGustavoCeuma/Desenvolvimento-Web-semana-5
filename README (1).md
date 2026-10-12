# Desenvolvimento-Web-semana-5


Entregável Web - Semana 05

Projeto com três partes feitas em index.html e app.js.

A Parte 1 valida um array de pedidos (cliente não vazio e valor numérico maior que 0), filtra os pagos, soma o total com reduce e formata os textos com toFixed(2). A Parte 2 é um buscador de CEP com a API ViaCEP, e a Parte 3 é uma mini Pokédex com a PokéAPI. As duas usam fetch com async/await e tratam os quatro estados da tela (carregando, erro, vazio e sucesso). Como o fetch não rejeita a Promise em erros HTTP, checo response.ok e response.status === 404 na mão. Os resultados são montados com createElement e textContent, sem innerHTML, para evitar XSS, e o preventDefault() impede o formulário de recarregar a página. Na Parte 2 também fiz o histórico de CEPs e o timeout de 5 segundos com AbortSignal.timeout.

Reflexão: por que Promise.all pode ser mais rápido que vários await seguidos? Com await em sequência, cada requisição só começa depois que a anterior terminou, então o tempo total é a soma dos tempos de todas. Já o Promise.all dispara todas as requisições ao mesmo tempo e espera todas terminarem juntas, então o tempo total fica próximo ao da requisição mais lenta, aproveitando melhor o tempo de rede.
