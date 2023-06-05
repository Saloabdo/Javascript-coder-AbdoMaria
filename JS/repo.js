const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaProductos = document.querySelector("#lista-productos");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  listaCursos.addEventListener("click", agregarProducto);

  //Eliminar producto del carrito

  carrito.addEventListener("click", eliminarProducto);

  //Vaciando el carrito

  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];

    limpiarHTML();
  });
}
//FUNCIONES

// (1) A través del boton podemos acceder al producto seleccionado
function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado = e.target.parentElement;
    leerDatosproducto(productoSeleccionado);
  }
}

// (2) Leer los datos del curso seleccionado y lo extrae
function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector(".card-title").innerText,
    precio: curso.querySelector("h6").innerText,
    id: curso.querySelector("a").getAttribute("id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito

  const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);
  if (existe) {
    //Actualizamos la cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; // retorna objeto actualizado
      } else {
        return producto; // retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...productos];
  } else {
    //Agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }
  carritoHTML();
}

// (3) Muestra el Carrito en el HTML

function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td>${producto.cantidad}</td>
    <td>
    <a href="" class="borrar-curso" id="${producto.id}">x</a>
    </td>`;
    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// (4) Eliminar producto del carrito

function eliminarProducto(e) {
  e.preventDefault();
  // console.log(e.target.classList);
  if (e.target.classList.contains("borrar-producto")) {
    const cursoID = e.target.getAttribute("id");

    //Eliminar del arreglo de articulosCarrito por el id
    articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoID);

    carritoHTML();
  }
}

// (5) Elimina los productos del HTML

function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
}