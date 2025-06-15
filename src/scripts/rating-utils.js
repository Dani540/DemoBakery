// src/scripts/rating-utils.js
// Centraliza la lógica de calificación y consulta de ratings para productos

export async function getRatingInfo(productId) {
  const user = JSON.parse(localStorage.getItem('user'));
  let userRating = 0;
  let promedio = 0;
  let cantidad = 0;
  if (!productId) return { promedio, cantidad, userRating };
  const res = await fetch(`/api/ratings?productId=${productId}`);
  let ratings = [];
  try {
    const data = await res.json();
    ratings = Array.isArray(data) ? data : (data.ratings || []);
  } catch (e) { ratings = []; }
  cantidad = ratings.length;
  promedio = cantidad > 0 ? ratings.reduce((acc, r) => acc + r.value, 0) / cantidad : 0;
  if (user) {
    const found = ratings.find(r => r.username === user.username);
    userRating = found ? found.value : 0;
  }
  return { promedio, cantidad, userRating };
}

export async function rateProduct(productId, value) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    window.location.href = '/login';
    return Promise.reject('Usuario no autenticado');
  }
  if (!productId) {
    alert('Error: productoId no definido');
    return Promise.reject('ProductoId no definido');
  }
  const payload = { username: user.username, productId, value };
  const res = await fetch('/api/rate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) {
    alert('Error al calificar: ' + (data.error || 'Error desconocido'));
  }
  // Siempre refresca los datos tras calificar
  return await getRatingInfo(productId);
}

window.ratingUtils = { getRatingInfo, rateProduct };
