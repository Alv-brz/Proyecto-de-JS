# 🛒 Simulador Ecommerce - JavaScript

## 📌 Descripción

Este proyecto consiste en un simulador interactivo de compras tipo Ecommerce, desarrollado con HTML, CSS y JavaScript puro.

Permite al usuario:
- Visualizar productos dinámicamente desde un archivo JSON
- Agregar productos al carrito
- Gestionar cantidades (+ / -)
- Eliminar productos
- Vaciar el carrito
- Simular el proceso completo de compra (checkout)
- Generar un recibo final de compra

---

## 🚀 Funcionalidades

-  Render dinámico de productos (Fetch + JSON)
-  Carrito persistente con LocalStorage
-  Control de cantidades por producto
-  Eliminación individual de productos
-  Botón para vaciar carrito completo
-  Cálculo automático de total
-  Cálculo de envío (gratis > S/300)
-  Checkout completo con validaciones
-  Validación de formulario (HTML5 + JS)
-  Generación de recibo con datos del cliente
-  Notificaciones con SweetAlert2 (librería externa)

---

## 🧠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage
- Fetch API
- SweetAlert2

---

## 📂 Estructura del proyecto
```
    proyecto/
    │
    ├── index.html
    ├── README.md
    │
    ├── css/
    │ └── style.css
    │
    ├── js/
    │ ├── productos.js
    │ ├── carrito.js
    │ ├── checkout.js
    │ └── utils.js
    │
    ├── data/
    │ └── productos.json
    │
    ├── pages/
    │ ├── carrito.html
    │ └── checkout.html
    │
    ├── img/
    │ └── productos/
    │
    └── video/

```

## 🔁 Flujo de la aplicación

1. Usuario visualiza productos
2. Agrega productos al carrito
3. Gestiona cantidades
4. Puede vaciar o editar carrito
5. Procede al checkout
6. Completa formulario
7. Se valida la información
8. Se muestra confirmación (SweetAlert2)
9. Se genera recibo de compra
10. Se limpia el carrito

---

## ⚠️ Consideraciones

- No se implementa backend real (simulación con JSON)
- No se usa pasarela de pagos real
- Validaciones implementadas en frontend
- Manejo de errores con try/catch

---

## 🧪 Cómo ejecutar el proyecto

1. Clonar el repositorio:

git clone https://github.com/Alv-brz/Proyecto-de-JS.git

2. Abrir el archivo:

index.html

3. Ejecutar en navegador

---

## 📌 Estado del proyecto

✔ Proyecto finalizado  
✔ Cumple con requisitos de la consigna  
✔ Incluye buenas prácticas de JS  
✔ Uso de DOM, eventos y almacenamiento  

---

## 👨‍💻 Autor

Alvaro Berrospi Albornoz

---

## 📎 Notas finales

Este proyecto fue desarrollado como entrega final del curso de JavaScript, cumpliendo con:

- Uso de DOM
- Uso de JSON + Fetch
- Lógica completa de negocio
- Librería externa obligatoria
- Flujo completo de compra
