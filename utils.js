
// utils.js — допоміжні функції
export function logMessage(container, text) {
  if (!container) return;
  const p = document.createElement('div');
  p.textContent = text;
  container.prepend(p);
}
