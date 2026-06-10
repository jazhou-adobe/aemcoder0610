export default async function decorate(block) {
  const rows = [...block.children];
  // First row is the heading section, remaining rows are cards
  // Each card row has: cell[0] = icon image, cell[1] = text + CTA
  rows.forEach((row, index) => {
    if (index === 0) {
      row.classList.add('study-cta-heading');
    } else {
      row.classList.add('study-cta-card');
    }
  });
}
