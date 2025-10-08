// favorites + search system
const Fav = (() => {
  const KEY = 'aleppian_favs_v1';
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch(e){ return []; }
  }
  function save(list){ localStorage.setItem(KEY, JSON.stringify(list)); }
  function toggle(id) {
    const list = load();
    const idx = list.indexOf(id);
    if (idx === -1) list.push(id);
    else list.splice(idx,1);
    save(list);
    return list;
  }
  function has(id) { return load().includes(id); }
  return { load, save, toggle, has };
})();

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.fav-btn');
  if (!btn) return;
  const id = btn.dataset.id;
  Fav.toggle(id);
  btn.textContent = Fav.has(id) ? '♥' : '♡';
});

function filterProperties(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll('.property-card').forEach(card => {
    const txt = (card.innerText || '').toLowerCase();
    card.style.display = txt.includes(q) ? '' : 'none';
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => filterProperties(e.target.value));
  }
  // apply fav state
  document.querySelectorAll('.fav-btn').forEach(btn => {
    if (Fav.has(btn.dataset.id)) btn.textContent = '♥';
  });
});
