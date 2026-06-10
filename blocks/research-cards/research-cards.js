export default async function decorate(block) {
  const rows = [...block.children];

  // Create a cards container for horizontal layout
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-row');

  rows.forEach((row) => {
    const cells = [...row.children];
    // Each row is a card with 3 cells: background image, icon, content
    if (cells.length >= 3) {
      const card = document.createElement('div');
      card.classList.add('card');

      // Cell 0: background image
      const bgCell = cells[0];
      bgCell.classList.add('card-bg');
      const bgImg = bgCell.querySelector('img');
      if (bgImg) {
        card.style.backgroundImage = `url('${bgImg.src}')`;
      }

      // Cell 1: icon
      const iconCell = cells[1];
      iconCell.classList.add('card-icon');

      // Cell 2: content (title, description, CTA)
      const contentCell = cells[2];
      contentCell.classList.add('card-content');

      // Build card structure: icon on top, content below
      card.append(iconCell, contentCell);
      cardsContainer.append(card);
    }
  });

  block.textContent = '';
  block.append(cardsContainer);
}
