// OBTENER CARRITO 
function obtenerCarrito() {
    try {
        const data = JSON.parse(localStorage.getItem("carrito"));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

// GUARDAR CARRITO
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// CONTADOR GLOBAL
function actualizarContadorCarrito() {

    const carrito = obtenerCarrito();

    let total = carrito.reduce((acc, p) => acc + p.cantidad, 0);

    const contador = document.getElementById("contadorCarrito");

    if (contador) {
        contador.textContent = total;
    }
}