(function () {
  const gridEl = document.getElementById('grid');
  const paletteEl = document.getElementById('palette');
  const undoBtn = document.getElementById('undoBtn');
  const eraserBtn = document.getElementById('eraserBtn');
  const clearBtn = document.getElementById('clearBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  const COLORS = ['#ff4fa3', '#ffc15e', '#b4ff39'];

  let gridSize = 16;
  let cells = [];
  let burstLayer = null;
  let currentColor = COLORS[0];
  let erasing = false;
  let painting = false;
  let strokeSaved = false;
  const undoStack = [];

  const STAR_PRESET = [
    '......PPPP......',
    '......PPPP......',
    '......PPPP......',
    '......PPPP......',
    '..PPPPCCCCPPPP..',
    '..PPPPCCCCPPPP..',
    '..PPPPCCCCPPPP..',
    '..PPPPCCCCPPPP..',
    '......PPPP......',
    '......PPPP......',
    '......PPPP......',
    '......PPPP......',
    '.......TT.......',
    '.......TTFF.....',
    '.......TTFF.....',
    '.......TT.......'
  ];
  const PRESET_COLORS = { P: '#ff4fa3', C: '#ffc15e', T: '#b4ff39', F: '#b4ff39' };

  const MODEL_TOTALS = {};
  COLORS.forEach(function (c) { MODEL_TOTALS[c] = 0; });
  STAR_PRESET.forEach(function (row) {
    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (ch === '.') continue;
      const col = PRESET_COLORS[ch];
      if (MODEL_TOTALS.hasOwnProperty(col)) MODEL_TOTALS[col]++;
    }
  });

  function buildReference(rows, colorMap) {
    const size = rows.length;
    const refGrid = document.getElementById('refGrid');
    refGrid.style.gridTemplateColumns = 'repeat(' + size + ', 1fr)';
    refGrid.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement('div');
      cell.className = 'ref-cell';
      refGrid.appendChild(cell);
    }
    return { size: size, els: refGrid.children };
  }

  function blockCells(size, rowRange, colRange, color) {
    const arr = [];
    for (let r = rowRange[0]; r <= rowRange[1]; r++) {
      for (let c = colRange[0]; c <= colRange[1]; c++) {
        arr.push({ index: r * size + c, color: color });
      }
    }
    return arr;
  }

  function patternCells(size, rows, colorMap, rowOffset) {
    const arr = [];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < rows[r].length; c++) {
        const ch = rows[r][c];
        if (ch !== '.') arr.push({ index: (r + rowOffset) * size + c, color: colorMap[ch] });
      }
    }
    return arr;
  }

  function buildSpriteFrames(size, rows, colorMap) {
    const stem = patternCells(size, rows.slice(12, 16), colorMap, 12);
    const center = blockCells(size, [4, 7], [6, 9], colorMap.C);
    const top = blockCells(size, [0, 3], [6, 9], colorMap.P);
    const bottom = blockCells(size, [8, 11], [6, 9], colorMap.P);
    const left = blockCells(size, [4, 7], [2, 5], colorMap.P);
    const right = blockCells(size, [4, 7], [10, 13], colorMap.P);
    return [
      [].concat(stem),
      [].concat(stem, center),
      [].concat(stem, center, top, bottom),
      [].concat(stem, center, top, bottom, left, right)
    ];
  }

  function drawFrame(ref, frame) {
    for (let i = 0; i < ref.els.length; i++) ref.els[i].style.backgroundColor = '#1a1c22';
    frame.forEach(function (cell) { ref.els[cell.index].style.backgroundColor = cell.color; });
  }

  let animating = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function playSprite(ref, frames) {
    if (animating) return;
    animating = true;
    const animateBtn = document.getElementById('animateBtn');
    animateBtn.disabled = true;

    if (reduceMotion) {
      drawFrame(ref, frames[frames.length - 1]);
      animating = false;
      animateBtn.disabled = false;
      return;
    }

    let step = 0;
    const frameDelay = 260;
    const timer = setInterval(function () {
      drawFrame(ref, frames[step]);
      step++;
      if (step >= frames.length) {
        clearInterval(timer);
        animating = false;
        animateBtn.disabled = false;
      }
    }, frameDelay);
  }

  function buildGrid(size) {
    gridSize = size;
    gridEl.style.gridTemplateColumns = 'repeat(' + size + ', 1fr)';
    gridEl.innerHTML = '';
    cells = new Array(size * size).fill(null);
    for (let i = 0; i < size * size; i++) {
      const c = document.createElement('div');
      c.className = 'cell';
      c.dataset.index = i;
      gridEl.appendChild(c);
    }
    burstLayer = document.createElement('div');
    burstLayer.className = 'burst-layer';
    gridEl.appendChild(burstLayer);
  }

  function render() {
    const els = gridEl.children;
    for (let i = 0; i < cells.length; i++) {
      const el = els[i];
      if (cells[i]) {
        el.style.backgroundColor = cells[i];
        el.style.backgroundImage = 'none';
      } else {
        el.style.backgroundColor = '';
        el.style.backgroundImage =
          'linear-gradient(45deg, #21232b 25%, transparent 25%, transparent 75%, #21232b 75%),' +
          'linear-gradient(45deg, #21232b 25%, transparent 25%, transparent 75%, #21232b 75%)';
      }
    }
  }

  function buildPalette() {
    paletteEl.innerHTML = '';
    COLORS.forEach(function (color) {
      const item = document.createElement('div');
      item.className = 'swatch-item';
      item.dataset.color = color;

      const b = document.createElement('button');
      b.className = 'swatch';
      b.style.background = color;
      if (color === currentColor && !erasing) b.classList.add('selected');
      b.addEventListener('click', function () {
        currentColor = color;
        erasing = false;
        eraserBtn.classList.remove('active');
        markSelected(b);
      });

      const count = document.createElement('span');
      count.className = 'swatch-count';

      item.appendChild(b);
      item.appendChild(count);
      paletteEl.appendChild(item);
    });
    updatePaletteCounts();
  }

  function getPlacedCount(color) {
    let n = 0;
    for (let i = 0; i < cells.length; i++) if (cells[i] === color) n++;
    return n;
  }

  function getRemaining(color) {
    return MODEL_TOTALS[color] - getPlacedCount(color);
  }

  function updatePaletteCounts() {
    Array.prototype.forEach.call(paletteEl.children, function (item) {
      const color = item.dataset.color;
      const remaining = getRemaining(color);
      item.querySelector('.swatch-count').textContent = remaining;
      item.classList.toggle('depleted', remaining <= 0);
    });
  }

  function markSelected(el) {
    Array.prototype.forEach.call(paletteEl.querySelectorAll('.swatch'), function (c) {
      c.classList.remove('selected');
    });
    el.classList.add('selected');
  }

  function saveUndoSnapshot() {
    undoStack.push(cells.slice());
    if (undoStack.length > 25) undoStack.shift();
    undoBtn.disabled = false;
  }

  function spawnBurst(cellEl, color, distMin, distMax, glow) {
    if (reduceMotion) return;
    const min = distMin || 9;
    const max = distMax || 15;
    const burst = document.createElement('div');
    burst.className = 'burst';
    burst.style.left = (cellEl.offsetLeft + cellEl.offsetWidth / 2) + 'px';
    burst.style.top = (cellEl.offsetTop + cellEl.offsetHeight / 2) + 'px';
    if (glow) {
      const ring = document.createElement('span');
      ring.className = 'ring';
      burst.appendChild(ring);
    }
    const count = glow ? 9 : 6;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle' + (glow ? ' glow' : '');
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const dist = min + Math.random() * (max - min);
      const size = glow ? 3 + Math.random() * 3 : 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      p.style.background = color;
      burst.appendChild(p);
    }
    burstLayer.appendChild(burst);
    setTimeout(function () { burst.remove(); }, 420);
  }

  function applyAt(index) {
    if (index < 0 || index >= cells.length) return;
    const value = erasing ? null : currentColor;
    const prevValue = cells[index];
    if (prevValue === value) return;
    if (value && getRemaining(value) <= 0) return;
    if (!strokeSaved) {
      saveUndoSnapshot();
      strokeSaved = true;
    }
    cells[index] = value;
    const el = gridEl.children[index];
    if (value) {
      el.style.backgroundColor = value;
      el.style.backgroundImage = 'none';
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
      spawnBurst(el, value, 16, 26, true);
    } else {
      el.style.backgroundColor = '';
      el.style.backgroundImage =
        'linear-gradient(45deg, #21232b 25%, transparent 25%, transparent 75%, #21232b 75%),' +
        'linear-gradient(45deg, #21232b 25%, transparent 25%, transparent 75%, #21232b 75%)';
      if (prevValue) spawnBurst(el, prevValue);
    }
    updatePaletteCounts();
  }

  function cellFromPoint(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el || el.parentElement !== gridEl) return -1;
    return parseInt(el.dataset.index, 10);
  }

  gridEl.addEventListener('pointerdown', function (e) {
    painting = true;
    strokeSaved = false;
    gridEl.setPointerCapture(e.pointerId);
    applyAt(cellFromPoint(e.clientX, e.clientY));
  });

  gridEl.addEventListener('pointermove', function (e) {
    if (!painting) return;
    applyAt(cellFromPoint(e.clientX, e.clientY));
  });

  function endStroke() {
    painting = false;
    strokeSaved = false;
  }

  gridEl.addEventListener('pointerup', endStroke);
  gridEl.addEventListener('pointercancel', endStroke);

  eraserBtn.addEventListener('click', function () {
    erasing = !erasing;
    eraserBtn.classList.toggle('active', erasing);
    if (erasing) {
      Array.prototype.forEach.call(paletteEl.children, function (c) {
        c.classList.remove('selected');
      });
    }
  });

  clearBtn.addEventListener('click', function () {
    if (cells.every(function (c) { return c === null; })) return;
    saveUndoSnapshot();
    cells.fill(null);
    render();
    updatePaletteCounts();
  });

  undoBtn.addEventListener('click', function () {
    if (!undoStack.length) return;
    cells = undoStack.pop();
    render();
    undoBtn.disabled = !undoStack.length;
    updatePaletteCounts();
  });

  downloadBtn.addEventListener('click', function () {
    const scale = 24;
    const canvas = document.createElement('canvas');
    canvas.width = gridSize * scale;
    canvas.height = gridSize * scale;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    for (let i = 0; i < cells.length; i++) {
      if (!cells[i]) continue;
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      ctx.fillStyle = cells[i];
      ctx.fillRect(col * scale, row * scale, scale, scale);
    }
    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  undoBtn.disabled = true;
  buildGrid(gridSize);
  const referenceGrid = buildReference(STAR_PRESET, PRESET_COLORS);
  const spriteFrames = buildSpriteFrames(STAR_PRESET.length, STAR_PRESET, PRESET_COLORS);
  buildPalette();

  document.getElementById('animateBtn').addEventListener('click', function () {
    playSprite(referenceGrid, spriteFrames);
  });
  requestAnimationFrame(function () { playSprite(referenceGrid, spriteFrames); });
})();
