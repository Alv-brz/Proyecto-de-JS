// VARIABLES
let carrito = [];

const contenedorCarrito = document.getElementById("carrito");
const detalleResumen = document.getElementById("detalleResumen");
const totalFinal = document.getElementById("totalFinal");

// CARGAR STORAGE
function cargarStorage() {
  try {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  } catch (error) {
    carrito = [];
  }

  renderCarrito();
}

// RENDER
function renderCarrito() {

  if (!contenedorCarrito) return;

  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {

    contenedorCarrito.innerHTML = `
      <div class="carrito-vacio">
        <h2>🛒 Tu carrito está vacío</h2>
        <p>Agrega productos para continuar</p>
        <a href="../index.html#productos" class="btn-volver">Ver Productos</a>
      </div>
    `;

    ocultarResumen();
    return;
  }

  carrito.forEach(prod => {

    const div = document.createElement("div");
    div.classList.add("item-carrito");

    div.innerHTML = `
      <div class="item-info">
        <img src="../img/productos/${prod.imagen}" onerror="this.src='https://via.placeholder.com/100'">

        <div class="info-texto">
          <h3>${prod.nombre}</h3>
          <p class="precio">S/ ${prod.precio}</p>
        </div>
      </div>

      <div class="item-controles">
        <button onclick="restar(${prod.id})">-</button>
        <span class="cantidad">${prod.cantidad}</span>
        <button onclick="sumar(${prod.id})">+</button>
        <button onclick="eliminar(${prod.id})" class="eliminar">X</button>
      </div>
    `;

    contenedorCarrito.appendChild(div);
  });

  mostrarResumen();
  actualizarResumenPro();
}

// ACCIONES
function sumar(id) {
  const prod = carrito.find(p => p.id === id);
  if (!prod) return;

  prod.cantidad++;
  guardar();
}

function restar(id) {
  const prod = carrito.find(p => p.id === id);
  if (!prod) return;

  if (prod.cantidad > 1) {
    prod.cantidad--;
  } else {
    carrito = carrito.filter(p => p.id !== id);
  }

  guardar();
}

function eliminar(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardar();
}

// GUARDAR
function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}

// VACIAR
function vaciarCarrito() {

  if (carrito.length === 0) {
    Swal.fire("El carrito ya está vacío");
    return;
  }

  Swal.fire({
    title: "¿Vaciar carrito?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {

      carrito = [];
      localStorage.removeItem("carrito");

      renderCarrito();
      actualizarContadorCarrito();

      Swal.fire("Eliminado", "El carrito fue vaciado", "success");
    }
  });
}

// RESUMEN
function actualizarResumenPro() {
  
  if (!detalleResumen || !totalFinal) return;

  let subtotal = 0;
  let cantidad = 0;

  carrito.forEach(p => {
    subtotal += p.precio * p.cantidad;
    cantidad += p.cantidad;
  });

  let envio = subtotal > 300 ? 0 : 15;
  let total = subtotal + envio;

  detalleResumen.innerHTML = `
    <div>
      <span>Productos (${cantidad})</span>
      <span>S/ ${subtotal}</span>
    </div>

    <div>
      <span>Envío</span>
      <span>${envio === 0 ? "Gratis" : "S/ " + envio}</span>
    </div>

    <div class="envio-msg">
      ${envio === 0
      ? "🚚 Envío gratis aplicado"
      : `Te faltan S/ ${300 - subtotal} para envío gratis`}
    </div>
  `;

  totalFinal.textContent = `S/ ${total}`;
}

// MOSTRAR / OCULTAR
function ocultarResumen() {
  const resumen = document.querySelector(".resumen");
  if (resumen) resumen.style.display = "none";
}

function mostrarResumen() {
  const resumen = document.querySelector(".resumen");
  if (resumen) resumen.style.display = "block";
}

// IR A PAGAR
function irAPagar() {

  if (carrito.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "Agrega productos antes de continuar"
    });
    return;
  }

  Swal.fire({
    title: "¿Ir a pagar?",
    text: "Serás redirigido al checkout",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "checkout.html";
    }
  });
}

// INICIO
document.addEventListener("DOMContentLoaded", () => {
  cargarStorage();
  actualizarContadorCarrito();
});