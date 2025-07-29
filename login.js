// Only allow accounts you add here
const VALID_USERS = [
  { username: "admin", password: "syndicate2024" },
  // Add more users here
];

const form = document.getElementById('login-form');
const msg = document.getElementById('login-msg');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const user = form.username.value.trim();
  const pass = form.password.value;
  const valid = VALID_USERS.some(u => u.username === user && u.password === pass);

  if (valid) {
    sessionStorage.setItem('influence_auth', user);
    window.location.href = "index.html";
  } else {
    msg.textContent = "Invalid credentials.";
    msg.style.color = "#f43f5e";
  }
});

// Always require login when visiting login.html
if (sessionStorage.getItem('influence_auth')) {
  window.location.href = "index.html";
}