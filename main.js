// Highlight active menu item based on URL
document.querySelectorAll('.menu-item').forEach(link => {
  if (location.pathname.endsWith(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});