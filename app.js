
// PARTE 1 - Manipulação e validação de dados

const pedidos = [
  { cliente: "Bia", valor: 120, status: "pago" },
  { cliente: "Carlos", valor: 80.5, status: "pendente" },
  { cliente: "", valor: 50, status: "pago" },
  { cliente: "Dani", valor: -10, status: "pago" },
  { cliente: "Edu", valor: "abc", status: "pago" },
  { cliente: "Fábio", valor: 200, status: "pago" },
  { cliente: "Gabi", valor: 45.9, status: "cancelado" },
];

// valida: cliente não vazio e valor numérico maior que 0
function pedidoValido(pedido) {
  return (
    typeof pedido.cliente === "string" &&
    pedido.cliente.trim() !== "" &&
    typeof pedido.valor === "number" &&
    pedido.valor > 0
  );
}

const pedidosValidos = pedidos.filter(pedidoValido);
const pedidosPagos = pedidosValidos.filter((pedido) => pedido.status === "pago");
const totalFaturado = pedidosPagos.reduce((total, pedido) => total + pedido.valor, 0);
const textosPedidos = pedidosPagos.map(
  (pedido) => `${pedido.cliente} — R$ ${pedido.valor.toFixed(2)}`
);

console.log("Pedidos válidos:", pedidosValidos);
console.log("Pedidos pagos:", textosPedidos);
console.log("Total faturado:", totalFaturado.toFixed(2));

// mostrando na tela (textContent, sem innerHTML)
const divPedidos = document.getElementById("pedidos-resultado");
const listaPedidos = document.createElement("ul");

textosPedidos.forEach((texto) => {
  const item = document.createElement("li");
  item.textContent = texto;
  listaPedidos.appendChild(item);
});

const textoTotal = document.createElement("p");
textoTotal.textContent = `Total faturado: R$ ${totalFaturado.toFixed(2)}`;

const textoResumo = document.createElement("p");
textoResumo.textContent = `${pedidosValidos.length} de ${pedidos.length} pedidos eram válidos.`;

divPedidos.append(textoResumo, listaPedidos, textoTotal);


// PARTE 2 - Buscador de CEP (ViaCEP)

const formCep = document.getElementById("form-cep");
const inputCep = document.getElementById("input-cep");
const botaoCep = document.getElementById("botao-cep");
const statusCep = document.getElementById("status-cep");
const resultadoCep = document.getElementById("resultado-cep");
const listaHistorico = document.getElementById("historico-cep");

const historicoCeps = []; // bônus: array de objetos

function mostrarCep(dados) {
  resultadoCep.replaceChildren(); // limpa o resultado anterior

  const campos = [
    ["Rua", dados.logradouro],
    ["Bairro", dados.bairro],
    ["Cidade", dados.localidade],
    ["UF", dados.uf],
  ];

  campos.forEach((campo) => {
    const dt = document.createElement("dt");
    dt.textContent = campo[0];
    const dd = document.createElement("dd");
    dd.textContent = campo[1];
    resultadoCep.append(dt, dd);
  });
}

function mostrarHistorico() {
  listaHistorico.replaceChildren();
  historicoCeps.forEach((registro) => {
    const item = document.createElement("li");
    item.textContent = `${registro.cep} - ${registro.rua}, ${registro.cidade}/${registro.uf}`;
    listaHistorico.appendChild(item);
  });
}

formCep.addEventListener("submit", async (event) => {
  event.preventDefault(); // evita recarregar a página

  const cep = inputCep.value.trim();

  // só dígitos e exatamente 8 caracteres
  if (!/^\d{8}$/.test(cep)) {
    resultadoCep.replaceChildren();
    statusCep.textContent = "CEP inválido: digite exatamente 8 números.";
    return;
  }

  // estado: carregando
  resultadoCep.replaceChildren();
  statusCep.textContent = "Buscando...";
  botaoCep.disabled = true;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      signal: AbortSignal.timeout(5000), // desafio extra: timeout de 5s
    });

    // fetch não rejeita erro HTTP, então checo manualmente
    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const dados = await response.json();

    // estado: vazio / não encontrado
    if (dados.erro) {
      statusCep.textContent = "CEP não encontrado.";
      return;
    }

    // estado: sucesso
    mostrarCep(dados);
    statusCep.textContent = "";

    historicoCeps.push({
      cep: cep,
      rua: dados.logradouro,
      cidade: dados.localidade,
      uf: dados.uf,
    });
    mostrarHistorico();
  } catch (erro) {
    // estado: erro (rede, HTTP ou timeout)
    if (erro.name === "TimeoutError") {
      statusCep.textContent = "A busca demorou demais. Tente novamente.";
    } else {
      statusCep.textContent = `Falha na busca do CEP: ${erro.message}`;
    }
  } finally {
    botaoCep.disabled = false;
  }
});


// PARTE 3 - Desafio Mini Pokédex (PokéAPI)

const formPokemon = document.getElementById("form-pokemon");
const inputPokemon = document.getElementById("input-pokemon");
const botaoPokemon = document.getElementById("botao-pokemon");
const statusPokemon = document.getElementById("status-pokemon");
const resultadoPokemon = document.getElementById("resultado-pokemon");

function mostrarPokemon(dados) {
  resultadoPokemon.replaceChildren();

  const titulo = document.createElement("h3");
  titulo.textContent = dados.name;
  resultadoPokemon.appendChild(titulo);

  // a imagem pode vir nula em alguns pokémons
  if (dados.sprites.front_default) {
    const imagem = document.createElement("img");
    imagem.src = dados.sprites.front_default;
    imagem.alt = `Imagem de ${dados.name}`;
    resultadoPokemon.appendChild(imagem);
  }

  const nomesTipos = dados.types.map((item) => item.type.name);
  const tipos = document.createElement("p");
  tipos.textContent = `Tipos: ${nomesTipos.join(", ")}`;
  resultadoPokemon.appendChild(tipos);
}

formPokemon.addEventListener("submit", async (event) => {
  event.preventDefault();

  // validação: não pode ser vazio, e converte para minúsculo
  const nome = inputPokemon.value.trim().toLowerCase();

  if (nome === "") {
    resultadoPokemon.replaceChildren();
    statusPokemon.textContent = "Digite o nome de um Pokémon.";
    return;
  }

  // estado: carregando
  resultadoPokemon.replaceChildren();
  statusPokemon.textContent = "Buscando...";
  botaoPokemon.disabled = true;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nome)}`
    );

    // estado: não encontrado (404)
    if (response.status === 404) {
      statusPokemon.textContent = "Pokémon não encontrado";
      return;
    }

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const dados = await response.json();

    // estado: sucesso
    mostrarPokemon(dados);
    statusPokemon.textContent = "";
  } catch (erro) {
    // estado: erro (rede ou HTTP)
    statusPokemon.textContent = `Falha na busca do Pokémon: ${erro.message}`;
  } finally {
    botaoPokemon.disabled = false;
  }
});
