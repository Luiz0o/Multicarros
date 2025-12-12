// ========================================
// 🎯 ESTOQUE.JS - VERSÃO CORRIGIDA
// ========================================

console.log("✅ Script estoque.js carregado");

// 📍 ELEMENTOS DO DOM
const btnNovoVeiculo = document.getElementById('btnNovoVeiculo');
const btnVoltar = document.getElementById('btnVoltar');
const modal = document.getElementById('modalVeiculo');
const btnCancelar = document.getElementById('btnCancelar');
const btnSalvar = document.getElementById('btnSalvar');
const tabela = document.getElementById('tabelaVeiculo').querySelector('tbody');
const searchInput = document.getElementById('searchInput');

// ========================================
// 🔙 BOTÃO VOLTAR
// ========================================
if (btnVoltar) {
  btnVoltar.addEventListener('click', () => {
    console.log("🔙 Voltando para dashboard...");
    window.location.href = "/HTML/dashboard.html";
  });
} else {
  console.warn("⚠️ Botão voltar não encontrado");
}

// ========================================
// ➕ BOTÃO NOVO VEÍCULO
// ========================================
if (btnNovoVeiculo) {
  btnNovoVeiculo.addEventListener('click', () => {
    console.log("➕ Redirecionando para cadastro...");
    window.location.href = "/HTML/cadastrarVeiculo.html";
  });
} else {
  console.warn("⚠️ Botão novo veículo não encontrado");
}

// ========================================
// 🔍 FILTRO DE BUSCA
// ========================================
if (searchInput && tabela) {
  searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    const rows = tabela.getElementsByTagName('tr');
    
    let visibleCount = 0;
    
    for (let row of rows) {
      const cells = row.getElementsByTagName('td');
      const match = Array.from(cells).some(cell => 
        cell.textContent.toLowerCase().includes(filter)
      );
      
      if (match) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    }
    
    console.log(`🔍 Busca: "${filter}" - ${visibleCount} resultado(s)`);
  });
} else {
  console.warn("⚠️ Input de busca ou tabela não encontrado");
}

// ========================================
// ❌ FECHAR MODAL AO CLICAR FORA
// ========================================
if (modal) {
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      console.log("❌ Modal fechado");
    }
  });
}

// ========================================
// 🛡️ FUNÇÃO AUXILIAR: ESCAPAR HTML
// ========================================
function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

console.log("✅ Todos os event listeners configurados!");