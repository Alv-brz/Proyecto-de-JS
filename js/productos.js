// VARIABLES
const contenedor = document.getElementById("contenedorProductos");

let productos = [];


// CARGAR PRODUCTOS
async function cargarProductos() {
  try {
    const res = await fetch("data/productos.json");
    const data = await res.json();

    productos = data;

    mostrarProductos();
    actualizarContadorCarrito();

  } catch (error) {
    console.error("Error cargando productos:", error);

    if (contenedor) {
      contenedor.innerHTML = "<p>Error cargando productos</p>";
    }
  }
}


// MOSTRAR PRODUCTOS
function mostrarProductos() {

  if (!contenedor) return;
  if (!Array.isArray(productos)) return;

  contenedor.innerHTML = "";

  const carrito = Array.isArray(obtenerCarrito()) ? obtenerCarrito() : [];

  productos.forEach(prod => {

    const enCarrito = carrito.find(p => p.id === prod.id);
    const cantidad = enCarrito ? enCarrito.cantidad : 0;

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="img/productos/${prod.imagen}" onerror="this.src='https://via.placeholder.com/150'">
      <h3>${prod.nombre}</h3>
      <p>S/ ${prod.precio}</p>

    <div class="controles">
      ${
        cantidad === 0
          ? `<button onclick="sumarProducto(${prod.id})">Agregar</button>`
          : `
              <button onclick="restarProducto(${prod.id})">-</button>
              <span>${cantidad}</span>
              <button onclick="sumarProducto(${prod.id})">+</button>
              <button onclick="eliminarProducto(${prod.id})" class="eliminar">x</button>

              <button onclick="irAlCarrito()" class="btn-carrito">
                🛒 Ir al carrito
              </button>
            `
      }
    </div>
    `;

    contenedor.appendChild(div);
  });
}


// STORAGE
function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  } catch {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ACCIONES PRODUCTOS

// SUMAR
function sumarProducto(id) {

  let carrito = obtenerCarrito();

  const prod = productos.find(p => p.id === id);
  if (!prod) return;

  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }

  guardarCarrito(carrito);

  mostrarProductos();
  actualizarContadorCarrito();
  mostrarToast("Producto agregado 🛒");
}


// RESTAR
function restarProducto(id) {

  let carrito = obtenerCarrito();
  const prod = carrito.find(p => p.id === id);

  if (!prod) return;

  if (prod.cantidad > 1) {
    prod.cantidad--;
  } else {
    carrito = carrito.filter(p => p.id !== id);
  }

  guardarCarrito(carrito);

  mostrarProductos();
  actualizarContadorCarrito();
}


// ELIMINAR
function eliminarProducto(id) {

  let carrito = obtenerCarrito();

  carrito = carrito.filter(p => p.id !== id);

  guardarCarrito(carrito);

  mostrarProductos();
  actualizarContadorCarrito();
}

// IR CARRITO
function irAlCarrito() {
  window.location.href = "pages/carrito.html";
}


// CONTADOR GLOBAL
function actualizarContadorCarrito() {

  const carrito = obtenerCarrito();
  const contador = document.getElementById("contadorCarrito");

  let total = 0;
  carrito.forEach(p => total += p.cantidad);

  if (contador) {
    contador.textContent = total;
  }
}


// TOAST
function mostrarToast(mensaje) {

  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = mensaje;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}


// INICIO
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});