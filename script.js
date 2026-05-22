/*
    CHAVE DO LOCALSTORAGE
    Onde os estabelecimentos ficam salvos no navegador.
*/
const CHAVE_ESTABELECIMENTOS = "vistoriafacil_estabelecimentos";

/*
    DADOS INICIAIS
    Usados apenas na primeira execução, quando ainda não existe nada salvo.
*/
const dadosIniciais = [
    {
        id: 1,
        nome: "Restaurante Sabor do Pantanal",
        cnpj: "12.345.678/0001-01",
        endereco: "Av. Rosário Congro, 1234",
        bairro: "Centro",
        categoria: "Restaurante",
        responsavel: "João Silva",
        telefone: "(67) 99999-9999",
        email: "contato@saborpantanal.com",
        ultimaVistoria: "2025-11-10",
        validade: "2026-11-10",
        observacoes: ""
    },
    {
        id: 2,
        nome: "Escola Municipal Dom Bosco",
        cnpj: "12.345.678/0001-02",
        endereco: "Rua Antônio Trajano, 567",
        bairro: "Vila Piloto",
        categoria: "Escola",
        responsavel: "Maria Souza",
        telefone: "(67) 98888-8888",
        email: "direcao@dombosco.ms.gov.br",
        ultimaVistoria: "2025-06-15",
        validade: "2026-06-15",
        observacoes: ""
    },
    {
        id: 3,
        nome: "Clínica Vida Plena",
        cnpj: "12.345.678/0001-03",
        endereco: "Av. Capitão Olinto Mancini, 890",
        bairro: "Jardim Alvorada",
        categoria: "Clínica",
        responsavel: "Carlos Lima",
        telefone: "(67) 97777-7777",
        email: "clinica@vidaplena.com",
        ultimaVistoria: "2024-04-02",
        validade: "2025-04-02",
        observacoes: ""
    },
    {
        id: 4,
        nome: "Supermercado Três Lagoas",
        cnpj: "12.345.678/0001-04",
        endereco: "Rua Paranaíba, 2100",
        bairro: "Vila Haro",
        categoria: "Comércio",
        responsavel: "Ana Ferreira",
        telefone: "(67) 96666-6666",
        email: "supermercado@treslagoas.com",
        ultimaVistoria: "2025-09-20",
        validade: "2026-09-20",
        observacoes: ""
    },
    {
        id: 5,
        nome: "Indústria CelluFibras MS",
        cnpj: "12.345.678/0001-05",
        endereco: "Rod. BR-262, km 12",
        bairro: "Interlagos",
        categoria: "Indústria",
        responsavel: "Bruno Oliveira",
        telefone: "(67) 95555-5555",
        email: "industria@cellufibras.com",
        ultimaVistoria: "2025-05-30",
        validade: "2026-05-30",
        observacoes: ""
    },
    {
        id: 6,
        nome: "Padaria Pão Quente",
        cnpj: "12.345.678/0001-06",
        endereco: "Rua Egídio Thomé, 432",
        bairro: "Jardim Paranapungá",
        categoria: "Comércio",
        responsavel: "Paulo Mendes",
        telefone: "(67) 94444-4444",
        email: "padaria@paoquente.com",
        ultimaVistoria: "2024-12-12",
        validade: "2025-12-12",
        observacoes: ""
    },
    {
        id: 7,
        nome: "Escola Estadual Afonso Pena",
        cnpj: "12.345.678/0001-07",
        endereco: "Av. Filinto Müller, 1500",
        bairro: "Santa Luzia",
        categoria: "Escola",
        responsavel: "Luciana Rocha",
        telefone: "(67) 93333-3333",
        email: "afonsopena@ms.gov.br",
        ultimaVistoria: "2025-10-05",
        validade: "2026-10-05",
        observacoes: ""
    },
    {
        id: 8,
        nome: "Restaurante Churrascaria Boi Gordo",
        cnpj: "12.345.678/0001-08",
        endereco: "Rua Sete de Setembro, 78",
        bairro: "Vila Nova",
        categoria: "Restaurante",
        responsavel: "Marcos Lima",
        telefone: "(67) 92222-2222",
        email: "boigordo@restaurante.com",
        ultimaVistoria: "2025-07-18",
        validade: "2026-07-18",
        observacoes: ""
    }
];

/*
    FUNÇÃO: formatarData
    Converte data YYYY-MM-DD para DD/MM/YYYY.
*/
function formatarData(data) {
    if (!data) return "-";
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

/*
    FUNÇÃO: carregarEstabelecimentos
    Lê os dados do localStorage ou cria os dados iniciais.
*/
function carregarEstabelecimentos() {
    const salvos = localStorage.getItem(CHAVE_ESTABELECIMENTOS);

    if (salvos) {
        return JSON.parse(salvos);
    }

    localStorage.setItem(CHAVE_ESTABELECIMENTOS, JSON.stringify(dadosIniciais));
    return dadosIniciais;
}

/*
    FUNÇÃO: salvarEstabelecimentos
    Salva a lista atual no localStorage.
*/
function salvarEstabelecimentos(lista) {
    localStorage.setItem(CHAVE_ESTABELECIMENTOS, JSON.stringify(lista));
}

/*
    FUNÇÃO: calcularStatus
    Define o status com base na data de validade.
*/
function calcularStatus(validade) {
    const hoje = new Date();
    const fim = new Date(validade);
    const diffDias = (fim - hoje) / (1000 * 60 * 60 * 24);

    if (diffDias < 0) return "Vencido";
    if (diffDias <= 30) return "A Vencer";
    return "Em Dia";
}

/*
    FUNÇÃO: renderizarTabela
    Monta as linhas da tabela.
*/
function renderizarTabela(lista) {
    const corpo = document.getElementById("tabela-corpo");
    if (!corpo) return;

    corpo.innerHTML = "";

    const classeMapa = {
        "Em Dia": "status-dia",
        "A Vencer": "status-avencer",
        "Vencido": "status-vencido"
    };

    lista.forEach((e) => {
        const status = calcularStatus(e.validade);
        const classe = classeMapa[status] || "";

        corpo.innerHTML += `
            <tr>
                <td><strong>${e.nome}</strong></td>
                <td>${e.cnpj}</td>
                <td>${e.endereco}</td>
                <td>${e.bairro}</td>
                <td>${e.categoria}</td>
                <td>${formatarData(e.ultimaVistoria)}</td>
                <td>${formatarData(e.validade)}</td>
                <td><span class="status ${classe}">${status}</span></td>
                <td>
                    <button class="btn" onclick="visualizarEstabelecimento(${e.id})">Ver</button>
                    <button class="btn" onclick="editarEstabelecimento(${e.id})">Editar</button>
                </td>
            </tr>
        `;
    });

    const contador = document.getElementById("contador");
    if (contador) {
        contador.textContent = `${lista.length} estabelecimentos cadastrados`;
    }
}

/*
    FUNÇÃO: renderizarTudo
    Atualiza a tabela com todos os dados.
*/
function renderizarTudo() {
    const lista = carregarEstabelecimentos();
    renderizarTabela(lista);
}

/*
    FUNÇÃO: filtrar
    Filtra por nome, bairro, tipo e status.
*/
function filtrar() {
    const busca = document.getElementById("busca")?.value.toLowerCase() || "";
    const bairro = document.getElementById("filtroBairro")?.value || "";
    const tipo = document.getElementById("filtroTipo")?.value || "";
    const statusFiltro = document.getElementById("filtroStatus")?.value || "";

    const lista = carregarEstabelecimentos();

    const filtrados = lista.filter(e => {
        const status = calcularStatus(e.validade);
        return (
            e.nome.toLowerCase().includes(busca) &&
            (bairro === "" || e.bairro === bairro) &&
            (tipo === "" || e.categoria === tipo) &&
            (statusFiltro === "" || status === statusFiltro)
        );
    });

    renderizarTabela(filtrados);
}

/*
    FUNÇÃO: visualizarEstabelecimento
    Mostra os dados do estabelecimento em um alerta.
*/
function visualizarEstabelecimento(id) {
    const lista = carregarEstabelecimentos();
    const e = lista.find(item => item.id === id);

    if (!e) return;

    const status = calcularStatus(e.validade);

    alert(
        `Nome: ${e.nome}\n` +
        `CNPJ: ${e.cnpj}\n` +
        `Endereço: ${e.endereco}\n` +
        `Bairro: ${e.bairro}\n` +
        `Categoria: ${e.categoria}\n` +
        `Responsável: ${e.responsavel || "-"}\n` +
        `Telefone: ${e.telefone || "-"}\n` +
        `Email: ${e.email || "-"}\n` +
        `Última vistoria: ${formatarData(e.ultimaVistoria)}\n` +
        `Validade: ${formatarData(e.validade)}\n` +
        `Status: ${status}\n` +
        `Observações: ${e.observacoes || "-"}`
    );
}

/*
    FUNÇÃO: editarEstabelecimento
    Edita nome, endereço, bairro e categoria usando prompt.
*/
function editarEstabelecimento(id) {
    const lista = carregarEstabelecimentos();
    const e = lista.find(item => item.id === id);

    if (!e) return;

    const novoNome = prompt("Nome", e.nome);
    if (novoNome === null) return;

    const novoEndereco = prompt("Endereço", e.endereco);
    if (novoEndereco === null) return;

    const novoBairro = prompt("Bairro", e.bairro);
    if (novoBairro === null) return;

    const novaCategoria = prompt("Categoria", e.categoria);
    if (novaCategoria === null) return;

    e.nome = novoNome;
    e.endereco = novoEndereco;
    e.bairro = novoBairro;
    e.categoria = novaCategoria;

    salvarEstabelecimentos(lista);
    renderizarTudo();
}

/*
    FUNÇÃO: consultar
    Busca um estabelecimento pelo CNPJ.
*/
function consultar() {
    const cnpj = document.getElementById("cnpjBusca")?.value.trim();
    const resultado = document.getElementById("resultadoConsulta");

    if (!resultado) return;

    if (!cnpj) {
        resultado.innerHTML = "Digite um CNPJ para realizar a consulta.";
        return;
    }

    const lista = carregarEstabelecimentos();
    const encontrado = lista.find(e => e.cnpj === cnpj);

    if (!encontrado) {
        resultado.innerHTML = "Nenhum estabelecimento encontrado com esse CNPJ.";
        return;
    }

    const status = calcularStatus(encontrado.validade);

    resultado.innerHTML = `
        <strong>Nome:</strong> ${encontrado.nome}<br>
        <strong>CNPJ:</strong> ${encontrado.cnpj}<br>
        <strong>Endereço:</strong> ${encontrado.endereco}<br>
        <strong>Bairro:</strong> ${encontrado.bairro}<br>
        <strong>Categoria:</strong> ${encontrado.categoria}<br>
        <strong>Responsável:</strong> ${encontrado.responsavel || "-"}<br>
        <strong>Telefone:</strong> ${encontrado.telefone || "-"}<br>
        <strong>Email:</strong> ${encontrado.email || "-"}<br>
        <strong>Última vistoria:</strong> ${formatarData(encontrado.ultimaVistoria)}<br>
        <strong>Validade:</strong> ${formatarData(encontrado.validade)}<br>
        <strong>Status:</strong> ${status}<br>
        <strong>Observações:</strong> ${encontrado.observacoes || "-"}
    `;
}

/*
    INICIALIZAÇÃO
    Quando a página carregar, renderiza a tabela.
*/
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("tabela-corpo")) {
        renderizarTudo();
    }
});