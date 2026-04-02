// VARIABLES
let carrito = [];

const lista = document.getElementById("resumenCheckout");
const totalHTML = document.getElementById("totalCheckout");

// CARGAR CHECKOUT
function cargarCheckout() {

  try {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  } catch (error) {
    carrito = [];
  }

  if (!lista || !totalHTML) return;

  if (carrito.length === 0) {
    lista.innerHTML = "<p>No tienes productos en el carrito</p>";
    totalHTML.textContent = "S/ 0";
    return;
  }

  renderCheckout();
}

// RENDER
function renderCheckout() {

  if (!lista || !totalHTML) return;

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {

    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("checkout-item");

    div.innerHTML = `
      <div>
        <h4>${p.nombre}</h4>
        <p>Cantidad: ${p.cantidad} x S/ ${p.precio}</p>
      </div>
      <strong>S/ ${subtotal}</strong>
    `;

    lista.appendChild(div);
  });

  totalHTML.textContent = `S/ ${total}`;
}

// FORM + VALIDACION
function initForm() {

  const form = document.getElementById("formCheckout");
  if (!form) return;

  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const tarjeta = document.getElementById("tarjeta");
  const cvv = document.getElementById("cvv");

  // SOLO LETRAS
  if (nombre) {
    nombre.addEventListener("input", () => {
      nombre.value = nombre.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ ]/g, "");
    });
  }

  if (apellido) {
    apellido.addEventListener("input", () => {
      apellido.value = apellido.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ ]/g, "");
    });
  }

  // SOLO NUMEROS
  if (tarjeta) {
    tarjeta.addEventListener("input", () => {
      tarjeta.value = tarjeta.value.replace(/\D/g, "").slice(0, 16);
    });
  }

  if (cvv) {
    cvv.addEventListener("input", () => {
      cvv.value = cvv.value.replace(/\D/g, "").slice(0, 3);
    });
  }

  // SUBMIT
  form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const nombreVal = document.getElementById("nombre")?.value || "";
    const correo = document.getElementById("correo")?.value || "";

    const datosCliente = document.getElementById("datosCliente");
    const contenedor = document.getElementById("productosRecibo");
    const totalRecibo = document.getElementById("totalRecibo");

    if (![datosCliente, contenedor, totalRecibo].every(el => el)) return;

    // LLENAR RECIBO
    datosCliente.innerHTML = `
      <p><strong>Cliente:</strong> ${nombreVal}</p>
      <p><strong>Correo:</strong> ${correo}</p>
    `;

    let total = 0;
    contenedor.innerHTML = "";

    carrito.forEach(p => {

      const subtotal = p.precio * p.cantidad;
      total += subtotal;

      contenedor.innerHTML += `
        <div class="recibo-item">

          <img src="../img/productos/${p.imagen}" onerror="this.src='https://via.placeholder.com/80'">

          <div class="recibo-info">
            <strong>${p.nombre}</strong>
            <p>Cantidad: ${p.cantidad}</p>
            <p>Precio: S/ ${p.precio}</p>
          </div>

          <div class="recibo-subtotal">
            S/ ${subtotal}
          </div>

        </div>
      `;
    });

    totalRecibo.textContent = `Total: S/ ${total}`;

    // SWEET ALERT 
    Swal.fire({
      icon: "success",
      title: "¡Pago exitoso!",
      text: "Tu compra se procesó correctamente",
      confirmButtonText: "Ver recibo"
    }).then(() => {
      continuarRecibo();
    });

  });
}

// MOSTRAR RECIBO
function continuarRecibo() {

  const popup = document.getElementById("popupRecibo");
  if (popup) popup.style.display = "flex";

  localStorage.removeItem("carrito");

  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }
}

// CERRAR
function cerrarRecibo() {
  window.location.href = "../index.html";
}

// INICIO
document.addEventListener("DOMContentLoaded", () => {
  cargarCheckout();
  initForm();

  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }
});