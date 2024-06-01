let productosCarrito = []
const botonCarrito = document.getElementById("botonCarrito")
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
    while (contenedorIndex.firstChild){
        contenedorIndex.removeChild(contenedorIndex.firstChild)
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
    renderizarModalDetalleProducto(detalleProducto);
}

const renderizarModalDetalleProducto = (detalleProducto) => {
    const botonAgregarCarrito = document.getElementById("botonAgregarAlCarrito")
    const tituloModalDetalle = document.getElementById('tituloModalDetalle')
    tituloModalDetalle.textContent = detalleProducto.title
    const descripcionModalDetalle = document.getElementById('descripcionModalDetalle')
    descripcionModalDetalle.textContent = detalleProducto.description
    const imgModalDetalle = document.getElementById('imgModalDetalle')
    imgModalDetalle.src = detalleProducto.image
    const precioModalDetalle = document.getElementById('precioModalDetalle')
    precioModalDetalle.textContent = `$${detalleProducto.price}`
    botonAgregarCarrito.addEventListener("click", () => {
        agregarAlCarrito(detalleProducto)
        alert(`${detalleProducto.title} agregado al carrito!`)
    })
}

const agregarAlCarrito = (producto) => {
    productosCarrito.push(producto)
    productosCarrito = productosCarrito.filter((item, index) => {
        return productosCarrito.indexOf(item) === index;
    })
    console.log(productosCarrito);
}

const renderizarCarrito = () => {
    const contenedorIndex = document.getElementById("contenedorIndex")
    const productosCategoria = document.getElementById("productosCategoria")
    const listaCarrito = document.getElementById("listaCarrito")
    const precioTotal = document.getElementById('precioTotal')
    let precioAcumulado = 0
    while (contenedorIndex.firstChild){
        contenedorIndex.removeChild(contenedorIndex.firstChild)
    }
    while (productosCategoria.firstChild){
        productosCategoria.removeChild(productosCategoria.firstChild)
    }
    productosCarrito.forEach(producto => {
        const contenedorProducto = document.createElement("div")
        contenedorProducto.classList.add("card")
        const imagenProducto = document.createElement("img")
        imagenProducto.classList.add("card-img-top")
        imagenProducto.src = producto.image
        const cuerpoProducto = document.createElement("div")
        cuerpoProducto.classList.add('cord-body')
        const tituloProducto = document.createElement('h3')
        tituloProducto.classList.add('card-title')
        tituloProducto.textContent = producto.title
        const precioProducto = document.createElement("h5")
        precioProducto.classList.add('card-text')
        precioProducto.textContent = `$${producto.price}`
        const botonEliminar = document.createElement('button')
        botonEliminar.classList.add('btn')
        botonEliminar.classList.add('btn-danger')
        botonEliminar.textContent = 'X'
        contenedorProducto.appendChild(imagenProducto)
        contenedorProducto.appendChild(tituloProducto)
        contenedorProducto.appendChild(precioProducto)
        contenedorProducto.appendChild(botonEliminar)
        listaCarrito.appendChild(contenedorProducto)

        precioAcumulado += producto.price

    })
    precioTotal.textContent = `$${precioAcumulado}`
}

mostrarTodosProductos()
mostrarCategorias()
