let productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || []
const botonCarrito = document.getElementById("botonCarrito")


const guardarCarrito = () => {
    localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito))
}

botonCarrito.addEventListener("click", () => {
    renderizarCarrito()
})


const obtenerTodosProductos = async () => {
    try {
        let respuesta = await fetch('https://fakestoreapi.com/products')
        let json = respuesta.json()
        return json
    } catch (error) {
        console.error(error);
    }
}

const obtenerCategorias = async () => {
    try {
        let respuesta = await fetch('https://fakestoreapi.com/products/categories')
        let json = respuesta.json()
        return json
    } catch (error) {
        console.error(error)
    }
}

const obtenerProductosCategoria = async (categoria) => {
    try {
        let respuesta = await fetch(`https://fakestoreapi.com/products/category/${categoria}`)
        let json = respuesta.json()
        return json
    } catch (error) {
        console.error(error)
    }
}

const obtenerDetalleProducto = async (producto) => {
    try {
        let respuesta = await fetch(`https://fakestoreapi.com/products/${producto.id}`)
        let json = respuesta.json()
        return json
    } catch (error) {
        console.error(error)
    }
}

const mostrarTodosProductos = async () => {
    let todosProductos = await obtenerTodosProductos()
    const contenedorTodosProductos = document.getElementById('contenedorIndex')
    
    todosProductos.forEach(producto => {
        const contenedorProducto = document.createElement('div')
        contenedorProducto.classList.add('card')
        const imagenProducto = document.createElement('img')
        imagenProducto.src = producto.image
        imagenProducto.width = 100
        imagenProducto.height = 100
        const contenedorDetalleProducto = document.createElement('div')
        contenedorDetalleProducto.classList.add('card-body')
        const tituloProducto = document.createElement('h5')
        tituloProducto.textContent = producto.title
        tituloProducto.classList.add('card-title')
        const precioProducto = document.createElement('h5')
        precioProducto.textContent = `$${producto.price}`
        precioProducto.classList.add('card-title')
        const descripcionProducto = document.createElement('p')
        descripcionProducto.textContent = producto.description
        descripcionProducto.classList.add('card-text')
        contenedorDetalleProducto.appendChild(tituloProducto)
        contenedorDetalleProducto.appendChild(descripcionProducto)
        contenedorDetalleProducto.appendChild(precioProducto)
        contenedorProducto.appendChild(imagenProducto)
        contenedorProducto.appendChild(contenedorDetalleProducto)
        contenedorTodosProductos.appendChild(contenedorProducto)


    })
    
}

const mostrarCategorias = async () => {
    let categorias = await obtenerCategorias()
    const selectNavBar = document.getElementById("selectNavBar")
    categorias.forEach(categoria => {
        const elementoCategoria = document.createElement("li")
        const enlace = document.createElement("a")
        enlace.textContent = categoria
        enlace.addEventListener("click", () => {
            mostrarProductosCategoria(categoria)
        })
        elementoCategoria.appendChild(enlace)
        elementoCategoria.style.cursor = "pointer"
        elementoCategoria.classList.add("dropdown-item")
        selectNavBar.appendChild(elementoCategoria)
    });
}

const mostrarProductosCategoria = async (categoria) => {
    const contenedorIndex = document.getElementById('contenedorIndex')
    const contenedorDetalleProducto = document.getElementById("detalleProducto")
    while (contenedorIndex.firstChild){
        contenedorIndex.removeChild(contenedorIndex.firstChild)
    }
    while (contenedorDetalleProducto.firstChild){
        contenedorDetalleProducto.removeChild(contenedorDetalleProducto.firstChild)
    }
    let productosCategoria = await obtenerProductosCategoria(categoria)
    const listaProductosCategoria = document.getElementById("productosCategoria")
    while (listaProductosCategoria.firstChild){
        listaProductosCategoria.removeChild(listaProductosCategoria.firstChild)
    }
    productosCategoria.forEach(producto => {
        const contenedorElementoProducto = document.createElement('div')
        contenedorElementoProducto.classList.add('card')
        const elementoProducto = document.createElement("div")
        elementoProducto.classList.add('card-body')
        const elementoTitulo = document.createElement("h3")
        const elementoPrecio = document.createElement("h4")
        const elementoImagen = document.createElement("img")
        elementoImagen.style.width = '18rem'
        elementoImagen.classList.add('card-img-top')
        elementoImagen.width = 100
        elementoImagen.height = 100
        elementoTitulo.textContent = producto.title
        elementoPrecio.textContent = `$${producto.price}`
        elementoImagen.src = producto.image
        elementoProducto.appendChild(elementoTitulo)
        elementoProducto.appendChild(elementoPrecio)
        elementoProducto.appendChild(elementoImagen)
        const botonSaberMas = document.createElement('button')
        const contenedorBotonSaberMas = document.createElement("div")
        contenedorBotonSaberMas.classList.add('contenedorBotonSaberMas')
        botonSaberMas.textContent = "saber mas"
        botonSaberMas.setAttribute("data-bs-toggle", "modal")
        botonSaberMas.setAttribute("data-bs-target", "#modalDetalle")
        botonSaberMas.classList.add("btnSaberMas")
        contenedorBotonSaberMas.appendChild(botonSaberMas)
        botonSaberMas.addEventListener("click", () => {
            mostrarDetalleProducto(producto)
        })
        contenedorElementoProducto.appendChild(elementoProducto)
        contenedorElementoProducto.appendChild(contenedorBotonSaberMas)
        listaProductosCategoria.appendChild(contenedorElementoProducto)
    })
}

const mostrarDetalleProducto = async (producto) => {
    let detalleProducto = await obtenerDetalleProducto(producto)
    const contenedorIndex = document.getElementById("contenedorIndex")
    const productosCategoria = document.getElementById("productosCategoria")
    while (contenedorIndex.firstChild){
        contenedorIndex.removeChild(contenedorIndex.firstChild)
    }
    while (productosCategoria.firstChild){
        productosCategoria.removeChild(productosCategoria.firstChild)
    }
    
    renderizarDetalleProducto(detalleProducto);
}

const renderizarDetalleProducto = (detalleProducto) => {
    const contenedorDetalleProducto = document.getElementById("detalleProducto")
    const detalleProductoHTML = `
    <div class="card" style="width: 18rem;">
        <div id="contenedorImg">
        <img src="${detalleProducto.image}" class="card-img-top" alt="${detalleProducto.title}">
        </div>
        <div class="card-body">
            <h5 class="card-title">${detalleProducto.title}</h5>
            <p class="card-text">${detalleProducto.description}</p>
            <h5 class="card-title">$${detalleProducto.price}</h5>
            <div id="contenedorBtn">
                <a href="#" class="btn btn-danger" id="btnVolver">Volver</a>
                <a href="#" class="btn btn-success" id="btnAgregarCarrito">Agregar al carrito</a>
            </div>
        </div>
    </div>
  `
    contenedorDetalleProducto.innerHTML = detalleProductoHTML
    const btnAgregarCarrito = document.getElementById("btnAgregarCarrito")
    btnAgregarCarrito.addEventListener("click", () => {
        agregarAlCarrito(detalleProducto.id)
        alert(`${detalleProducto.title} ha sido agregado al carrito!`)
        mostrarProductosCategoria(detalleProducto.category)
    })
    const btnVolver = document.getElementById('btnVolver')
    btnVolver.addEventListener("click", () => {
        mostrarProductosCategoria(detalleProducto.category)
    })
    
}

const agregarAlCarrito = async (id) => {
    const todosProductos = await obtenerTodosProductos()
    const productoParaCarrito = todosProductos.find(producto => producto.id == id)
    productosCarrito.push(productoParaCarrito)
    guardarCarrito()

}

const renderizarCarrito = () => {
    const contenedorIndex = document.getElementById("contenedorIndex")
    const productosCategoria = document.getElementById("productosCategoria")
    const contenedorDetalleProducto = document.getElementById("detalleProducto")
    const listaCarrito = document.getElementById("listaCarrito")
    const contenedorPrecioTotal = document.getElementById("precioTotalContenedor")
    const precioTotal = document.getElementById('precioTotal')
    let precioAcumulado = 0
    while (contenedorIndex.firstChild){
        contenedorIndex.removeChild(contenedorIndex.firstChild)
    }
    while (productosCategoria.firstChild){
        productosCategoria.removeChild(productosCategoria.firstChild)
    }
    while (contenedorDetalleProducto.firstChild){
        contenedorDetalleProducto.removeChild(contenedorDetalleProducto.firstChild)
    }
    listaCarrito.innerHTML = ""
    productosCarrito.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('col-12');

        // Estructura del producto
        divProducto.innerHTML = `
            <div class="card" id>
            <div class="card-body">
                <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                <h5 class="card-title">${producto.title}</h5>
                <p class="card-text">$${producto.price}</p>
                <a href="#" class="btn btn-danger btn-sm" id="btnEliminarProductoCarrito">Eliminar</a>
            </div>
            </div>
        `
      listaCarrito.appendChild(divProducto)
      precioAcumulado += producto.price
      divProducto.querySelector('#btnEliminarProductoCarrito').addEventListener('click', (event) => {
        event.preventDefault();
        eliminarProductoCarrito(producto.id)})


    })

    if (precioAcumulado == 0) {
        precioTotal.textContent = "No hay productos en el carrito"
    }
    else{
        precioTotal.textContent = `$${precioAcumulado}`
    }

    contenedorPrecioTotal.appendChild(precioTotal)
    listaCarrito.appendChild(contenedorPrecioTotal)
}

const eliminarProductoCarrito = (id) => {
    const indice = productosCarrito.findIndex(producto => producto.id == id)
    if (indice != -1){
        productosCarrito.splice(indice, 1)
        guardarCarrito()
        
    }
    renderizarCarrito()
}

mostrarTodosProductos()
mostrarCategorias()
