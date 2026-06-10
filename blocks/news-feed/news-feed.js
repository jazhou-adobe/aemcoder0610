export default async function decorate(block) {
  const rows = [...block.children];

  // First row is the heading row (has heading + "More news" link)
  const headingRow = rows[0];
  headingRow.classList.add('news-feed-heading');
  const headingLink = headingRow.querySelector('a');
  if (headingLink) {
    headingLink.classList.add('news-feed-more-link');
  }

  // Last row is the "More news stories" CTA
  const ctaRow = rows[rows.length - 1];
  ctaRow.classList.add('news-feed-cta');

  // Middle rows are news cards
  const cardRows = rows.slice(1, rows.length - 1);
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('news-feed-cards');

  cardRows.forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('div');
    card.classList.add('news-card');

    // First cell: image
    const imgCell = cells[0];
    const img = imgCell.querySelector('img');
    if (img) {
      card.style.backgroundImage = `url(${img.src})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center 30%';
    }

    // Second cell: date, title, link
    const textCell = cells[1];
    const dateEl = textCell.querySelector('.news-date');
    const titleEl = textCell.querySelector('h3');
    const linkEl = textCell.querySelector('a');

    // Build overlay content
    const overlay = document.createElement('div');
    overlay.classList.add('news-card-overlay');

    if (dateEl) {
      const dateDiv = document.createElement('div');
      dateDiv.classList.add('news-card-date');
      const parts = dateEl.textContent.trim().split(' ');
      dateDiv.innerHTML = `<span class="day">${parts[0]}</span><span class="month">${parts[1] || ''}</span>`;
      overlay.append(dateDiv);
    }

    if (titleEl) {
      const title = document.createElement('h3');
      title.textContent = titleEl.textContent;
      overlay.append(title);
    }

    if (linkEl) {
      const link = document.createElement('a');
      link.href = linkEl.href;
      link.textContent = linkEl.textContent;
      link.classList.add('news-card-link');
      overlay.append(link);
    }

    card.append(overlay);

    // Wrap entire card in a link for accessibility
    if (linkEl) {
      card.addEventListener('click', () => {
        window.location.href = linkEl.href;
      });
      card.style.cursor = 'pointer';
    }

    cardsContainer.append(card);
    row.remove();
  });

  // Insert cards container after heading
  headingRow.after(cardsContainer);
}
