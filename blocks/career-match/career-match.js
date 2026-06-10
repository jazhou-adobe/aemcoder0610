export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const row = rows[0];
  const cells = [...row.children];

  // Cell 0: background image
  // Cell 1: icon/badge image
  // Cell 2: text content (heading, description, CTA)
  const bgCell = cells[0];
  const iconCell = cells[1];
  const textCell = cells[2];

  // Clear block content and rebuild
  block.textContent = '';

  // Background image container
  const bgDiv = document.createElement('div');
  bgDiv.className = 'career-match-bg';
  const bgPicture = bgCell.querySelector('picture');
  if (bgPicture) bgDiv.append(bgPicture);
  block.append(bgDiv);

  // Content overlay
  const contentDiv = document.createElement('div');
  contentDiv.className = 'career-match-content';

  // Icon
  const iconDiv = document.createElement('div');
  iconDiv.className = 'career-match-icon';
  const iconPicture = iconCell.querySelector('picture');
  if (iconPicture) iconDiv.append(iconPicture);
  contentDiv.append(iconDiv);

  // Text content (heading, description, CTA)
  const textChildren = [...textCell.children];
  textChildren.forEach((child) => contentDiv.append(child));

  block.append(contentDiv);
}
