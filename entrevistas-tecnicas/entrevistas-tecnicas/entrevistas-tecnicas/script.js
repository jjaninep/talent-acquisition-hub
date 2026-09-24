/**
 * Rola a página suavemente até o elemento desejado sem redirecionar a URL
 * (Evita a tela branca no Google Sites)
 */
function scrollToSection(sectionId, btnElement) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Atualiza destaque visual dos botões
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }
}

/**
 * Aplica os filtros de busca por texto, stack e senioridade na tabela do Pool
 */
function filterPool() {
  const searchVal = document.getElementById('searchInput').value.toLowerCase();
  const stackVal = document.getElementById('stackFilter').value;
  const seniorityVal = document.getElementById('seniorityFilter').value;
  
  const rows = document.querySelectorAll('#poolTableBody tr');
  let visibleCount = 0;
  const activeStacks = new Set();

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const rowStack = row.getAttribute('data-stack');
    const rowSeniority = row.getAttribute('data-seniority');

    const matchesSearch = text.includes(searchVal);
    const matchesStack = (stackVal === 'ALL' || rowStack === stackVal);
    const matchesSeniority = (seniorityVal === 'ALL' || rowSeniority === seniorityVal);

    if (matchesSearch && matchesStack && matchesSeniority) {
      row.style.display = '';
      visibleCount++;
      if (rowStack) activeStacks.add(rowStack);
    } else {
      row.style.display = 'none';
    }
  });

  // Atualiza os contadores
  document.getElementById('totalAvaliadores').innerText = visibleCount;
  document.getElementById('totalStacks').innerText = activeStacks.size;
}

// Garante que a contagem inicial seja calculada assim que o documento for carregado
document.addEventListener('DOMContentLoaded', filterPool);
