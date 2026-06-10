export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // First row is the header (h2 + intro paragraph)
  const headerRow = rows[0];
  headerRow.classList.add('ss-header');

  // Remaining rows are student stories (tab name, image, quote+name+degree)
  const stories = rows.slice(1);

  // Build tab navigation
  const tabNav = document.createElement('div');
  tabNav.classList.add('ss-tabs');

  // Build panels
  const panels = [];

  stories.forEach((row, index) => {
    const cells = [...row.children];
    // cell 0 = tab name, cell 1 = image, cell 2 = quote + name + degree
    const tabName = cells[0]?.textContent.trim() || `Student ${index + 1}`;
    const imageCell = cells[1];
    const contentCell = cells[2];

    // Create tab button
    const tabBtn = document.createElement('button');
    tabBtn.classList.add('ss-tab');
    tabBtn.textContent = tabName;
    if (index === 0) tabBtn.classList.add('active');
    tabNav.appendChild(tabBtn);

    // Create panel
    const panel = document.createElement('div');
    panel.classList.add('ss-panel');
    if (index === 0) panel.classList.add('active');

    // Thumbnail
    const thumbnail = document.createElement('div');
    thumbnail.classList.add('ss-thumbnail');
    const img = imageCell?.querySelector('img');
    if (img) {
      const pic = imageCell.querySelector('picture') || document.createElement('picture');
      if (!pic.contains(img)) pic.appendChild(img);
      thumbnail.appendChild(pic);
    }
    panel.appendChild(thumbnail);

    // Content (quote, name, degree)
    const content = document.createElement('div');
    content.classList.add('ss-content');
    if (contentCell) {
      const h3 = contentCell.querySelector('h3');
      if (h3) content.appendChild(h3);

      const paragraphs = [...contentCell.querySelectorAll('p')];
      if (paragraphs[0]) {
        paragraphs[0].classList.add('ss-name');
        content.appendChild(paragraphs[0]);
      }
      if (paragraphs[1]) {
        paragraphs[1].classList.add('ss-degree');
        content.appendChild(paragraphs[1]);
      }
    }
    panel.appendChild(content);

    panels.push(panel);

    // Remove original row
    row.remove();
  });

  // Insert tabs and panels after header
  block.appendChild(tabNav);
  panels.forEach((p) => block.appendChild(p));

  // Tab click handler
  tabNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.ss-tab');
    if (!btn) return;
    const idx = [...tabNav.children].indexOf(btn);

    tabNav.querySelectorAll('.ss-tab').forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');

    panels.forEach((p, i) => {
      p.classList.toggle('active', i === idx);
    });
  });
}
