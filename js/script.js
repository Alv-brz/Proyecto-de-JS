// ARRAY CARRITO
let carrito = [];

// DOM
const contenedorProductos = document.getElementById("contenedorProductos");
const contenedorCarrito = document.getElementById("carrito");
const totalHTML = document.getElementById("total");

// FETCH PRODUCTOS (ASYNC)

async function cargarProductos() {
  try {
    const response = await fetch("./data/productos.json"); // ajusta si es necesario
    const productos = await response.json();

    mostrarProductos(productos);

  } catch (error) {
    mostrarToast("Error al cargar productos");
  }
}

// MOSTRAR PRODUCTOS

function mostrarProductos(productos) {
  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>Precio: S/ ${prod.precio}</p>
      <button>Agregar</button>
    `;

    const boton = div.querySelector("button");
    boton.addEventListener("click", () => {
      agregarAlCarrito(prod.id, prod.nombre, prod.precio);
    });

    contenedorProductos.appendChild(div);
  });
}

// CLASE PRODUCTO

class Producto {
  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }

  subtotal() {
    return this.precio * this.cantidad;
  }
}

// AGREGAR AL CARRITO

function agregarAlCarrito(id, nombre, precio) {

  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push(new Producto(id, nombre, precio, 1));
  }

  guardarStorage();
  renderCarrito();

  mostrarToast("Producto agregado");
}

// RENDER CARRITO

function renderCarrito() {
  contenedorCarrito.innerHTML = "";

  carrito.forEach(prod => {
    const div = document.createElement("div");

    div.innerHTML = `
      ${prod.nombre} - Cantidad: ${prod.cantidad} - Subtotal: S/ ${prod.subtotal()}
      <button>Eliminar</button>
    `;

    const botonEliminar = div.querySelector("button");
    botonEliminar.addEventListener("click", () => {
      eliminarProducto(prod.id);
    });

    contenedorCarrito.appendChild(div);
  });

  actualizarTotal();
}

// ELIMINAR PRODUCTO

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);

  guardarStorage();
  renderCarrito();

  mostrarToast("Producto eliminado");
}

// TOTAL

function actualizarTotal() {
  const total = carrito.reduce((acc, prod) => acc + prod.subtotal(), 0);
  totalHTML.textContent = total;
}

// STORAGE

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarStorage() {
  const data = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = data.map(p => new Producto(p.id, p.nombre, p.precio, p.cantidad));

  renderCarrito();
}

// TOASTIFY

function mostrarToast(mensaje) {
  Toastify({
    text: mensaje,
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)"
    }
  }).showToast();
}

// INICIO

cargarProductos();
cargarStorage();