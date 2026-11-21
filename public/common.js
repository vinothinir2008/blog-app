const token = () => localStorage.getItem('token');
const role = () => localStorage.getItem('role');
function myId() {
  try { return JSON.parse(atob(token().split('.')[1])).id; } catch { return null; }
}
async function api(path, method = 'GET', body) {
  const res = await fetch('/api' + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token() ? { Authorization: 'Bearer ' + token() } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Error');
  return data;
}
function logout() { localStorage.clear(); location.href = 'login.html'; }
function navbar() {
  document.getElementById('nav').innerHTML = `
    <span class="brand">📝 MyBlog</span>
    <a href="index.html">Home</a>
    ${token() ? '<a href="write.html">Write Post</a>' : ''}
    ${token()
      ? `<a href="#" onclick="logout()">Logout (${localStorage.getItem('name')})</a>`
      : '<a href="login.html">Login</a>'}`;
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}