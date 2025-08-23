(function () {
  const cols = 33;
  const rows = 34;
  const grid = document.getElementById('grid');
  const tooltip = document.getElementById('tooltip');
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = String(x).padStart(2, '0');
      cell.dataset.y = String(y).padStart(2, '0');
      cell.tabIndex = 0;
      cell.addEventListener('mouseenter', () => showTooltip(cell));
      cell.addEventListener('mouseleave', hideTooltip);
      cell.addEventListener('mousemove', () => positionTooltipOver(cell));
      cell.addEventListener('click', () => openRoom(cell));
      grid.appendChild(cell);
    }
  }
  function showTooltip(cell) {
    tooltip.classList.remove('hidden');
    tooltip.textContent = `[${cell.dataset.x},${cell.dataset.y}]`;
    positionTooltipOver(cell);
  }
  function hideTooltip() {
    tooltip.classList.add('hidden');
  }
  function positionTooltipOver(cell) {
    const rect = cell.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.top = rect.top + 'px';
  }
  function openRoom(cell) {
    const imgPath = `./rooms/${cell.dataset.x}_${cell.dataset.y}.jpg`;
    const img = new Image();
    img.onload = () => {
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      const imgEl = document.createElement('img');
      imgEl.src = imgPath;
      overlay.appendChild(imgEl);
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => overlay.remove());
    };
    img.onerror = () => { };
    img.src = imgPath;
  }
})();
