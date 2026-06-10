export default async function decorate(block) {
  const rows = [...block.children];

  // First row is the heading/intro
  const headingRow = rows[0];

  // Remaining rows are cards (each has: bg image cell, icon cell, text cell)
  const cardRows = rows.slice(1);

  // Create a scrollable cards container
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-container';

  cardRows.forEach((row) => {
    const cells = [...row.children];
    // cell 0 = background image
    // cell 1 = icon
    // cell 2 = text content (h3, p, CTA)
    const bgCell = cells[0];
    const iconCell = cells[1];
    const textCell = cells[2];

    const card = document.createElement('div');
    card.className = 'card';

    // Background image
    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    const bgImg = bgCell?.querySelector('img');
    if (bgImg) {
      cardImage.appendChild(bgImg.cloneNode(true));
    }
    card.appendChild(cardImage);

    // Card content overlay
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    // Icon
    const iconImg = iconCell?.querySelector('img');
    if (iconImg) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'card-icon';
      iconDiv.appendChild(iconImg.cloneNode(true));
      cardContent.appendChild(iconDiv);
    }

    // Text content (h3, p, CTA)
    if (textCell) {
      [...textCell.children].forEach((child) => {
        cardContent.appendChild(child.cloneNode(true));
      });
    }

    card.appendChild(cardContent);
    cardsContainer.appendChild(card);

    // Remove original row
    row.remove();
  });

  block.appendChild(cardsContainer);
}
