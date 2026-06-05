const CHAVE_ESTABELECIMENTOS = "vistoriafacil_estabelecimentos";

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

let graficoVistorias;
let graficoStatus;

function formatarData(data) {
  if (!data) return "-";
  const partes = data.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function carregarEstabelecimentos() {
  const salvos = localStorage.getItem(CHAVE_ESTABELECIMENTOS);
  if (salvos) return JSON.parse(salvos);

  localStorage.setItem(CHAVE_ESTABELECIMENTOS, JSON.stringify(dadosIniciais));
  return dadosIniciais;
}

function salvarEstabelecimentos(lista) {
  localStorage.setItem(CHAVE_ESTABELECIMENTOS, JSON.stringify(lista));
}

function calcularStatus(validade) {
  const hoje = new Date();
  const fim = new Date(validade);
  const diffDias = (fim - hoje) / (1000 * 60 * 60 * 24);

  if (diffDias < 0) return "Vencido";
  if (diffDias <= 30) return "A Vencer";
  return "Em Dia";
}

function classeStatus(status) {
  return {
    "Em Dia": "status-dia",
    "A Vencer": "status-avencer",
    "Vencido": "status-vencido"
  }[status] || "";
}

function atualizarCardsDashboard(lista) {
  const total = lista.length;
  const emDia = lista.filter(e => calcularStatus(e.validade) === "Em Dia").length;
  const aVencer = lista.filter(e => calcularStatus(e.validade) === "A Vencer").length;
  const vencidas = lista.filter(e => calcularStatus(e.validade) === "Vencido").length;

  const totalEl = document.getElementById("cardTotal");
  const emDiaEl = document.getElementById("cardEmDia");
  const aVencerEl = document.getElementById("cardAVencer");
  const vencidasEl = document.getElementById("cardVencidas");

  if (totalEl) totalEl.textContent = total;
  if (emDiaEl) emDiaEl.textContent = emDia;
  if (aVencerEl) aVencerEl.textContent = aVencer;
  if (vencidasEl) vencidasEl.textContent = vencidas;
}

function renderizarUltimasVistorias(lista) {
  const corpo = document.getElementById("ultimas-vistorias");
  if (!corpo) return;

  const ordenado = [...lista]
    .filter(item => item.ultimaVistoria)
    .sort((a, b) => new Date(b.ultimaVistoria) - new Date(a.ultimaVistoria))
    .slice(0, 5);

  corpo.innerHTML = ordenado.map(item => {
    const status = calcularStatus(item.validade);
    return `
      <tr>
        <td><strong>${item.nome}</strong></td>
        <td>${item.bairro}</td>
        <td>${formatarData(item.ultimaVistoria)}</td>
        <td><span class="status ${classeStatus(status)}">${status}</span></td>
      </tr>
    `;
  }).join("");
}

function renderizarTabela(lista) {
  const corpo = document.getElementById("tabela-corpo");
  if (!corpo) return;

  corpo.innerHTML = lista.map((e) => {
    const status = calcularStatus(e.validade);

    return `
      <tr>
        <td><strong>${e.nome}</strong></td>
        <td>${e.cnpj}</td>
        <td>${e.endereco || "-"}</td>
        <td>${e.bairro}</td>
        <td>${e.categoria}</td>
        <td>${formatarData(e.ultimaVistoria)}</td>
        <td>${formatarData(e.validade)}</td>
        <td><span class="status ${classeStatus(status)}">${status}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn btn-secundario" onclick="visualizarEstabelecimento(${e.id})">Ver</button>
            <button class="btn" onclick="editarEstabelecimento(${e.id})">Editar</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  const contador = document.getElementById("contador");
  if (contador) {
    contador.textContent = `${lista.length} estabelecimentos cadastrados`;
  }
}

function renderizarTudo() {
  const lista = carregarEstabelecimentos();
  renderizarTabela(lista);
}

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

function criarCampoModal(rotulo, valor) {
  return `<div class="modal-field"><span>${rotulo}</span><strong>${valor || "-"}</strong></div>`;
}

function visualizarEstabelecimento(id) {
  const lista = carregarEstabelecimentos();
  const e = lista.find(item => item.id === id);
  if (!e) return;

  const status = calcularStatus(e.validade);
  const modal = document.getElementById("modalVisualizacao");
  const conteudo = document.getElementById("modalConteudo");

  if (!modal || !conteudo) return;

  conteudo.innerHTML = [
    criarCampoModal("Nome", e.nome),
    criarCampoModal("CNPJ", e.cnpj),
    criarCampoModal("Endereço", e.endereco),
    criarCampoModal("Bairro", e.bairro),
    criarCampoModal("Categoria", e.categoria),
    criarCampoModal("Responsável", e.responsavel),
    criarCampoModal("Telefone", e.telefone),
    criarCampoModal("Email", e.email),
    criarCampoModal("Última vistoria", formatarData(e.ultimaVistoria)),
    criarCampoModal("Validade", formatarData(e.validade)),
    criarCampoModal("Status", status),
    criarCampoModal("Observações", e.observacoes || "-")
  ].join("");

  modal.classList.add("ativo");
}

function fecharModal() {
  document.getElementById("modalVisualizacao")?.classList.remove("ativo");
}

function editarEstabelecimento(id) {
  const lista = carregarEstabelecimentos();
  const e = lista.find(item => item.id === id);

  if (!e) return;

  const novoNome = prompt("Nome", e.nome);
  if (novoNome === null) return;

  const novoCnpj = prompt("CNPJ", e.cnpj);
  if (novoCnpj === null) return;

  const novoEndereco = prompt("Endereço", e.endereco);
  if (novoEndereco === null) return;

  const novoBairro = prompt("Bairro", e.bairro);
  if (novoBairro === null) return;

  const novaCategoria = prompt("Categoria", e.categoria);
  if (novaCategoria === null) return;

  const novoResponsavel = prompt("Responsável", e.responsavel || "");
  if (novoResponsavel === null) return;

  const novoTelefone = prompt("Telefone", e.telefone || "");
  if (novoTelefone === null) return;

  const novoEmail = prompt("Email", e.email || "");
  if (novoEmail === null) return;

  const novaUltimaVistoria = prompt("Última vistoria (YYYY-MM-DD)", e.ultimaVistoria || "");
  if (novaUltimaVistoria === null) return;

  const novaValidade = prompt("Validade (YYYY-MM-DD)", e.validade || "");
  if (novaValidade === null) return;

  const novasObservacoes = prompt("Observações", e.observacoes || "");
  if (novasObservacoes === null) return;

  Object.assign(e, {
    nome: novoNome,
    cnpj: novoCnpj,
    endereco: novoEndereco,
    bairro: novoBairro,
    categoria: novaCategoria,
    responsavel: novoResponsavel,
    telefone: novoTelefone,
    email: novoEmail,
    ultimaVistoria: novaUltimaVistoria,
    validade: novaValidade,
    observacoes: novasObservacoes
  });

  salvarEstabelecimentos(lista);
  renderizarTudo();
}

function consultar() {
  const cnpj = document.getElementById("cnpjBusca")?.value.trim();
  const resultado = document.getElementById("resultadoConsulta");

  if (!resultado) return;

  if (!cnpj) {
    resultado.innerHTML = `<p>Digite um CNPJ para realizar a consulta.</p>`;
    return;
  }

  const lista = carregarEstabelecimentos();
  const encontrado = lista.find(e => e.cnpj === cnpj);

  if (!encontrado) {
    resultado.innerHTML = `<p>Nenhum estabelecimento encontrado com esse CNPJ.</p>`;
    return;
  }

  const status = calcularStatus(encontrado.validade);

  resultado.innerHTML = `
    <div class="result-grid">
      <div class="result-item"><span>Nome</span><strong>${encontrado.nome}</strong></div>
      <div class="result-item"><span>CNPJ</span><strong>${encontrado.cnpj}</strong></div>
      <div class="result-item"><span>Endereço</span><strong>${encontrado.endereco || "-"}</strong></div>
      <div class="result-item"><span>Bairro</span><strong>${encontrado.bairro}</strong></div>
      <div class="result-item"><span>Categoria</span><strong>${encontrado.categoria}</strong></div>
      <div class="result-item"><span>Responsável</span><strong>${encontrado.responsavel || "-"}</strong></div>
      <div class="result-item"><span>Telefone</span><strong>${encontrado.telefone || "-"}</strong></div>
      <div class="result-item"><span>Email</span><strong>${encontrado.email || "-"}</strong></div>
      <div class="result-item"><span>Última vistoria</span><strong>${formatarData(encontrado.ultimaVistoria)}</strong></div>
      <div class="result-item"><span>Validade</span><strong>${formatarData(encontrado.validade)}</strong></div>
      <div class="result-item full"><span>Status</span><strong><span class="status ${classeStatus(status)}">${status}</span></strong></div>
      <div class="result-item full"><span>Observações</span><strong>${encontrado.observacoes || "-"}</strong></div>
    </div>
  `;
}

function obterDadosGraficos() {
  const lista = carregarEstabelecimentos();
  const meses = ["Jun", "Jul", "Ago", "Set", "Out", "Nov"];
  const vistorias = [0, 0, 0, 0, 0, 0];

  lista.forEach(item => {
    const mes = (item.ultimaVistoria || "").slice(5, 7);
    const mapa = { "06": 0, "07": 1, "08": 2, "09": 3, "10": 4, "11": 5 };
    if (mapa[mes] !== undefined) {
      vistorias[mapa[mes]]++;
    }
  });

  const statusContagem = { "Em Dia": 0, "A Vencer": 0, "Vencido": 0 };

  lista.forEach(item => {
    const status = calcularStatus(item.validade);
    if (statusContagem[status] !== undefined) {
      statusContagem[status]++;
    }
  });

  return { meses, vistorias, statusContagem };
}

function renderizarGraficos() {
  const canvas1 = document.getElementById("graficoVistorias");
  const canvas2 = document.getElementById("graficoStatus");

  if (!canvas1 || !canvas2 || typeof Chart === "undefined") return;

  const dados = obterDadosGraficos();

  if (graficoVistorias) graficoVistorias.destroy();
  if (graficoStatus) graficoStatus.destroy();

  const pluginLabelsBarras = {
    id: "labelsBarras",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      ctx.save();
      ctx.font = "bold 13px Inter";
      ctx.fillStyle = "#f8fafc";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      meta.data.forEach((bar, index) => {
        const valor = chart.data.datasets[0].data[index];
        if (valor > 0) {
          ctx.fillText(valor, bar.x, bar.y - 6);
        }
      });

      ctx.restore();
    }
  };

  const pluginLabelsDoughnut = {
    id: "labelsDoughnut",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      ctx.save();
      ctx.font = "bold 14px Inter";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      meta.data.forEach((arc, index) => {
        const valor = chart.data.datasets[0].data[index];
        if (valor > 0) {
          const pos = arc.tooltipPosition();
          ctx.fillText(valor, pos.x, pos.y);
        }
      });

      ctx.restore();
    }
  };

  graficoVistorias = new Chart(canvas1, {
    type: "bar",
    data: {
      labels: dados.meses,
      datasets: [{
        label: "Vistorias",
        data: dados.vistorias,
        backgroundColor: "#d62828",
        borderRadius: 10,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: "#cbd5e1" },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: { color: "#cbd5e1", precision: 0 },
          grid: { color: "rgba(255,255,255,0.08)" }
        }
      },
      plugins: {
        legend: { display: false }
      }
    },
    plugins: [pluginLabelsBarras]
  });

  graficoStatus = new Chart(canvas2, {
    type: "doughnut",
    data: {
      labels: ["Em Dia", "A Vencer", "Vencido"],
      datasets: [{
        data: [
          dados.statusContagem["Em Dia"],
          dados.statusContagem["A Vencer"],
          dados.statusContagem["Vencido"]
        ],
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
        borderColor: "#101b2a",
        borderWidth: 4,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#cbd5e1",
            padding: 18
          }
        }
      }
    },
    plugins: [pluginLabelsDoughnut]
  });
}

function atualizarAlertaVencidos() {
  const alerta = document.getElementById("alertaVencidos");
  if (!alerta) return;

  const lista = carregarEstabelecimentos();
  const vencidos = lista.filter(e => calcularStatus(e.validade) === "Vencido");

  if (vencidos.length === 0) {
    alerta.style.display = "none";
    alerta.innerHTML = "";
    return;
  }

  alerta.style.display = "block";
  alerta.innerHTML = `
    <div>
      <span class="titulo">${vencidos.length} estabelecimento(s) com vistoria vencida</span>
      <span class="lista">${vencidos.map(e => e.nome).join(" • ")}</span>
    </div>
  `;
}

function salvarNovoEstabelecimento(event) {
  event.preventDefault();

  const lista = carregarEstabelecimentos();

  const novo = {
    id: Date.now(),
    nome: document.getElementById("nome")?.value.trim(),
    cnpj: document.getElementById("cnpj")?.value.trim(),
    endereco: document.getElementById("endereco")?.value.trim(),
    bairro: document.getElementById("bairro")?.value,
    categoria: document.getElementById("categoria")?.value,
    responsavel: document.getElementById("responsavel")?.value.trim(),
    telefone: document.getElementById("telefone")?.value.trim(),
    email: document.getElementById("email")?.value.trim(),
    ultimaVistoria: document.getElementById("ultimaVistoria")?.value,
    validade: document.getElementById("validade")?.value,
    observacoes: document.getElementById("observacoes")?.value.trim()
  };

  if (!novo.nome || !novo.cnpj || !novo.bairro || !novo.categoria) {
    alert("Preencha os campos obrigatórios: nome, CNPJ, bairro e tipo.");
    return;
  }

  lista.push(novo);
  salvarEstabelecimentos(lista);
  event.target.reset();
  alert("Estabelecimento salvo com sucesso.");
  window.location.href = "estabelecimentos.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const lista = carregarEstabelecimentos();

  renderizarTabela(lista);
  atualizarCardsDashboard(lista);
  renderizarUltimasVistorias(lista);
  renderizarGraficos();
  atualizarAlertaVencidos();

  const form = document.getElementById("formEstabelecimento");
  if (form) {
    form.addEventListener("submit", salvarNovoEstabelecimento);
  }

  const modal = document.getElementById("modalVisualizacao");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        fecharModal();
      }
    });
  }
});