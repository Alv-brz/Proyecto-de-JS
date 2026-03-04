// CONSTRUCTOR

function Producto(id, nombre, precio, cantidad){

this.id = id
this.nombre = nombre
this.precio = precio
this.cantidad = cantidad
this.subtotal = precio * cantidad

}


// ARRAY DE PRODUCTOS

let productos = []


// ELEMENTOS DEL DOM

let nombreInput = document.getElementById("nombre")
let precioInput = document.getElementById("precio")
let cantidadInput = document.getElementById("cantidad")

let lista = document.getElementById("listaProductos")
let totalHTML = document.getElementById("total")

let boton = document.getElementById("btnAgregar")


// EVENTO

boton.addEventListener("click", agregarProducto)


// AGREGAR PRODUCTO

function agregarProducto(){

let nombre = nombreInput.value
let precio = parseFloat(precioInput.value)
let cantidad = parseInt(cantidadInput.value)

if(nombre === "" || isNaN(precio) || isNaN(cantidad)){

return

}

let producto = new Producto(productos.length+1, nombre, precio, cantidad)

productos.push(producto)

guardarProductos()

mostrarProductos()

limpiarInputs()

}


// MOSTRAR PRODUCTOS

function mostrarProductos(){

lista.innerHTML = ""

let total = 0

productos.forEach(producto => {

lista.innerHTML += `
<li>
${producto.nombre} | Precio: $${producto.precio} | Cantidad: ${producto.cantidad}
</li>
`

total += producto.subtotal

})

totalHTML.innerText = "Total: $" + total

}


// GUARDAR EN LOCALSTORAGE

function guardarProductos(){

localStorage.setItem("productos", JSON.stringify(productos))

}


// CARGAR PRODUCTOS

function cargarProductos(){

let productosGuardados = JSON.parse(localStorage.getItem("productos"))

if(productosGuardados){

productos = productosGuardados
mostrarProductos()

}

}


// LIMPIAR INPUTS

function limpiarInputs(){

nombreInput.value = ""
precioInput.value = ""
cantidadInput.value = ""

}


// INICIAR

cargarProductos()