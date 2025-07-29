// Utility to wrap each character in a span
function wrapCharacters(node) {
  if (node.nodeType === 3) {
    const text = node.textContent;
    const frag = document.createDocumentFragment();
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'char-span';
      frag.appendChild(span);
    });
    node.parentNode.replaceChild(frag, node);
  } else if (node.nodeType === 1 && !node.classList.contains('cabinet')) {
    Array.from(node.childNodes).forEach(wrapCharacters);
  }
}

// Only wrap relevant content (skip menu, headings, etc.)
document.querySelectorAll('.floating-card p, .floating-card ul, .floating-card li, .floating-card section, .floating-card footer').forEach(el => {
  wrapCharacters(el);
});

// On scroll, scatter away characters that are above the viewport
function scatterInvisibleChars() {
  document.querySelectorAll('.char-span').forEach(span => {
    const rect = span.getBoundingClientRect();
    if (rect.top < 0 && !span.classList.contains('scatter-away')) {
      // Scatter up and slightly sideways
      span.classList.add('scatter-away');
      span.style.setProperty('--scatter-angle', `${Math.random() * 60 - 30}deg`);
    } else if (rect.top >= 0 && span.classList.contains('scatter-away')) {
      // If back in view, return to normal
      span.classList.remove('scatter-away');
      span.style.removeProperty('--scatter-angle');
    }
  });
}

window.addEventListener('scroll', scatterInvisibleChars);
window.addEventListener('resize', scatterInvisibleChars);
document.addEventListener('DOMContentLoaded', scatterInvisibleChars);
