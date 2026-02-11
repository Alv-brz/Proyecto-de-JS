const IGV = 0.18;

let carrito = [];
let total = 0;

const productos = [
    { nombre: "Laptop", precio: 2500 },
    { nombre: "Mouse", precio: 50 },
    { nombre: "Teclado", precio: 120 },
    { nombre: "Audífonos", precio: 180 }
];

// BOTÓN

document.getElementById("btnIniciar")
    .addEventListener("click", iniciarSimulador);


// FUNCIÓN PRINCIPAL

function iniciarSimulador() {

    alert("Bienvenido al simulador");
    console.log("Simulador iniciado");

    let continuar = true;

    while (continuar) {

        let menu = "Selecciona un producto:\n\n";

        for (let i = 0; i < productos.length; i++) {
            menu += (i + 1) + ". " + productos[i].nombre +
                " - S/ " + productos[i].precio + "\n";
        }

        menu += "0. Finalizar compra";

        let opcion = prompt(menu);

        if (opcion === null) {
            break;
        }

        opcion = parseInt(opcion);

        if (opcion === 0) {
            continuar = false;
        }

        else if (opcion >= 1 && opcion <= productos.length) {

            let producto = productos[opcion - 1];

            carrito.push(producto);
            total += producto.precio;

            alert("Agregaste: " + producto.nombre);
            console.log("Producto agregado:", producto);
        }

        else {
            alert("Opción inválida");
        }
    }

    mostrarResumen();
}

// FUNCIÓN RESUMEN

function mostrarResumen() {

    if (carrito.length === 0) {
        alert("No compraste nada");
        return;
    }

    let subtotal = total;
    let impuesto = subtotal * IGV;
    let totalFinal = subtotal + impuesto;

    let detalle = "🧾 RESUMEN DE COMPRA<br><br>";

    carrito.forEach(function (item) {

        detalle += "• " + item.nombre +
            " - S/ " + item.precio + "<br>";

    });

    detalle += "<br>Subtotal: S/ " + subtotal.toFixed(2);
    detalle += "<br>IGV: S/ " + impuesto.toFixed(2);
    detalle += "<br><b>Total: S/ " + totalFinal.toFixed(2) + "</b>";

    document.getElementById("resultado").innerHTML = detalle;


    let confirmar = confirm("¿Confirmar compra?");

    if (confirmar) {
        alert("Compra exitosa. ¡Gracias!");
        console.log("Compra confirmada");
    }

    else {
        alert("Compra cancelada");
        console.log("Compra cancelada");
    }
}