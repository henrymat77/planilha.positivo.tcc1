
// Busca simples: filtra linhas que contenham o termo em qualquer célula
function setupSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if(!input || !table) return;
  input.addEventListener('input', function(){
    const q = input.value.trim().toLowerCase();
    const rows = table.tBodies[0].rows;
    for (let r of rows){
      const text = r.textContent.toLowerCase();
      r.style.display = text.indexOf(q) !== -1 ? '' : 'none';
    }
  });
}

// Dark mode toggle with localStorage
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('tcc_dark', isDark ? '1' : '0');
  document.getElementById('darkToggle').textContent = isDark ? '🌙' : '☀️';
}

document.addEventListener('DOMContentLoaded', function(){
  // apply saved theme
  const saved = localStorage.getItem('tcc_dark');
  if(saved === '1') {
    document.documentElement.classList.add('dark');
    const t = document.getElementById('darkToggle');
    if(t) t.textContent = '🌙';
  }
  // wire up search inputs dynamically
  document.querySelectorAll('[data-search-input]').forEach(function(input){
    const tid = input.getAttribute('data-search-target');
    setupSearch(input.id, document.getElementById(tid));
  });
  // smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
});
