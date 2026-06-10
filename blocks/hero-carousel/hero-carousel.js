export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    // First cell = text content, second cell = image (background)
    if (cells.length >= 2) {
      const textCell = cells[0];
      const imageCell = cells[1];

      textCell.classList.add('hero-carousel-content');
      imageCell.classList.add('hero-carousel-image');

      // Wrap buttons in a flex container for side-by-side layout
      const buttons = textCell.querySelectorAll('.button-wrapper');
      if (buttons.length > 0) {
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('hero-carousel-buttons');
        buttons.forEach((btn) => btnContainer.appendChild(btn));
        textCell.appendChild(btnContainer);
      }
    }
  });
}
