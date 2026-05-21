/*
DADOS DOS ESTABELECIMENTOS
Array com todos os estabelecimentos cadastrados no sistema.
Cada objeto representa um estabelecimento com seus dados principais.
*/
const estabelecimentos = [
    {
        nome: "Restaurante Sabor do Pantanal",
        cnpj: "12.345.678/0001-01",
        endereco: "Av. Rosário Congro, 1234",
        bairro: "Centro",
        categoria: "Restaurante",
        ultimaVistoria: "10/11/2025",
        validade: "10/11/2026",
        status: "Em Dia"
    },
    {
        nome: "Escola Municipal Dom Bosco",
        cnpj: "12.345.678/0001-02",
        endereco: "Rua Antônio Trajano, 567",
        bairro: "Vila Piloto",
        categoria: "Escola",
        ultimaVistoria: "15/06/2025",
        validade: "15/06/2026",
        status: "A Vencer"
    },
    {
        nome: "Clínica Vida Plena",
        cnpj: "12.345.678/0001-03",
        endereco: "Av. Capitão Olinto Mancini, 890",
        bairro: "Jardim Alvorada",
        categoria: "Clínica",
        ultimaVistoria: "02/04/2024",
        validade: "02/04/2025",
        status: "Vencido"
    },
    {
        nome: "Supermercado Três Lagoas",
        cnpj: "12.345.678/0001-04",
        endereco: "Rua Paranaíba, 2100",
        bairro: "Vila Haro",
        categoria: "Comércio",
        ultimaVistoria: "20/09/2025",
        validade: "20/09/2026",
        status: "Em Dia"
    },
    {
        nome: "Indústria CelluFibras MS",
        cnpj: "12.345.678/0001-05",
        endereco: "Rod. BR-262, km 12",
        bairro: "Interlagos",
        categoria: "Indústria",
        ultimaVistoria: "30/05/2025",
        validade: "30/05/2026",
        status: "A Vencer"
    },
    {
        nome: "Padaria Pão Quente",
        cnpj: "12.345.678/0001-06",
        endereco: "Rua Egídio Thomé, 432",
        bairro: "Jardim Paranapungá",
        categoria: "Comércio",
        ultimaVistoria: "12/12/2024",
        validade: "12/12/2025",
        status: "Vencido"
    },
    {
        nome: "Escola Estadual Afonso Pena",
        cnpj: "12.345.678/0001-07",
        endereco: "Av. Filinto Müller, 1500",
        bairro: "Santa Luzia",
        categoria: "Escola",
        ultimaVistoria: "05/10/2025",
        validade: "05/10/2026",
        status: "Em Dia"
    },
    {
        nome: "Restaurante Churrascaria Boi Gordo",
        cnpj: "12.345.678/0001-08",
        endereco: "Rua Sete de Setembro, 78",
        bairro: "Vila Nova",
        categoria: "Restaurante",
        ultimaVistoria: "18/07/2025",
        validade: "18/07/2026",
        status: "A Vencer"
    }
];

/*
FUNÇÃO: renderizarTabela
Recebe uma lista de estabelecimentos e monta as linhas da tabela.
*/
function renderizarTabela(lista) {
    const corpo = document.getElementById("tabela-corpo");
    if (!corpo) return;

    corpo.innerHTML = "";

    // Mapeia o status para a classe CSS correta
    const classeMapa = {
        "Em Dia": "status-dia",
        "A Vencer": "status-avencer",
        "Vencido": "status-vencido"
    };

    // Para cada estabelecimento, cria uma linha na tabela
    lista.forEach((e, index) => {
        const classe = classeMapa[e.status] || "";
        corpo.innerHTML += `
            <tr>
                <td><strong>${e.nome}</strong></td>
                <td>${e.cnpj}</td>
                <td>${e.endereco}</td>
                <td>${e.bairro}</td>
                <td>${e.categoria}</td>
                <td>${e.ultimaVistoria}</td>
                <td>${e.validade}</td>
                <td><span class="status ${classe}">${e.status}</span></td>
                <td>
                    <button class="btn" onclick="alert('Visualizando: ${e.nome}')">Ver</button>
                </td>
            </tr>
        `;
    });

    // Atualiza o contador de resultados
    const contador = document.getElementById("contador");
    if (contador) {
        contador.textContent = `${lista.length} de ${estabelecimentos.length} estabelecimentos cadastrados`;
    }
}

/*
FUNÇÃO: filtrar
Lê os valores dos filtros e mostra só os estabelecimentos correspondentes.
*/
function filtrar() {
    const busca = document.getElementById("busca")?.value.toLowerCase() || "";
    const bairro = document.getElementById("filtroBairro")?.value || "";
    const tipo = document.getElementById("filtroTipo")?.value || "";
    const status = document.getElementById("filtroStatus")?.value || "";

    const filtrados = estabelecimentos.filter(e => {
        return (
            e.nome.toLowerCase().includes(busca) &&
            (bairro === "" || e.bairro === bairro) &&
            (tipo === "" || e.categoria === tipo) &&
            (status === "" || e.status === status)
        );
    });

    renderizarTabela(filtrados);
}

/*
INICIALIZAÇÃO
Quando a página carregar, renderiza a tabela com todos os estabelecimentos.
*/
document.addEventListener("DOMContentLoaded", () => {
    renderizarTabela(estabelecimentos);
});