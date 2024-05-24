let productosCarrito = []
const botonCarrito = document.getElementById("botonCarrito")

botonCarrito.addEventListener("click", () => {
    renderizarModalCarrito()
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
    
    console.log(todosProductos);
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
        botonSaberMas.textContent = "Saber mas"
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
    const modal = document.getElementById('modalDetalleProducto')
    const contenedorModal = document.getElementById("contenedorModalDetalleProducto")
    const botonCerrarModal = document.getElementById("cerrarModal")
    const tituloProductoModal = document.getElementById("tituloProducto")
    const descripcionProductoModal = document.getElementById("descripcionProducto")
    const categoriaProductoModal = document.getElementById("categoriaProducto")
    const imagenProductoModal = document.getElementById("imgProducto")
    const precioProductoModal = document.getElementById("precioProducto")
    const botonCarrito = document.getElementById("agregarAlCarrito")

    modal.style.display = 'block'
    contenedorModal.style.position = "static"
    contenedorModal.style.height = "100%"
    contenedorModal.style.overflow = "hidden"
    tituloProductoModal.textContent = detalleProducto.title
    descripcionProductoModal.textContent = detalleProducto.description
    categoriaProductoModal.textContent = detalleProducto.category
    imagenProductoModal.src = detalleProducto.image
    imagenProductoModal.width = 200
    imagenProductoModal.height = 200
    precioProductoModal.textContent = `$${detalleProducto.price}`

    botonCarrito.addEventListener("click" , () => {
        let productoParaAgregar = {
            ...detalleProducto,
            cantidad: 1
        }
        productosCarrito.push(productoParaAgregar)
        alert(`${productoParaAgregar.title} agregado al carrito!`)
        modal.style.display = 'none'
        contenedorModal.style.position = "inherit"
        contenedorModal.style.height = "auto"
        contenedorModal.style.overflow = "visible"
    })

    botonCerrarModal.addEventListener("click", () => {
        modal.style.display = 'none'
        contenedorModal.style.position = "inherit"
        contenedorModal.style.height = "auto"
        contenedorModal.style.overflow = "visible"
    })
    
}

const renderizarModalCarrito = () => {
    const modal = document.getElementById("modalCarrito")
    const listaModalCarrito = document.getElementById("listaModalCarrito")
    const cancelar = document.getElementById("cancelarCompra")
    cancelar.addEventListener("click", () => {
        modal.style.display = 'none'
        listaModalCarrito.style.position = "inherit"
        listaModalCarrito.style.height = "auto"
        listaModalCarrito.style.overflow = "visible"
    })
    while(listaModalCarrito.firstChild){
        listaModalCarrito.removeChild(listaModalCarrito.firstChild)
    }
    console.log(productosCarrito);
    

    modal.style.display = 'block'
    listaModalCarrito.style.position = "static"
    listaModalCarrito.style.height = "100%"
    listaModalCarrito.style.overflow = "hidden"

    productosCarrito.forEach(producto => {
        const listaProductosCarrito = document.getElementById("listaModalCarrito")
        const elementoProducto = document.createElement("ul")
        const imagenProducto = document.createElement("img")
        const tituloProducto = document.createElement("span")
        const precioProductoCarrito = document.createElement("span")
        const productoCantidad = document.createElement("span")
        productoCantidad.textContent = producto.cantidad
        const botonEliminar = document.createElement("button")
        const botonAgregar = document.createElement("button")
        let precioProducto = (producto.cantidad * (parseInt(producto.price)))
        botonAgregar.addEventListener("click", () => {
            producto.cantidad += 1
            productoCantidad.textContent = producto.cantidad
            precioProducto = (producto.cantidad * (parseInt(producto.price)))
            precioProductoCarrito.textContent = `$${precioProducto}`
            
        })
        botonEliminar.addEventListener("click", () => {
            producto.cantidad -= 1
            productoCantidad.textContent = producto.cantidad
            precioProducto = (producto.cantidad * (parseInt(producto.price)))
            precioProductoCarrito.textContent = `$${precioProducto}`
            if (producto.cantidad < 1){
                let indiceProducto = productosCarrito.indexOf(producto)
                productosCarrito.splice(indiceProducto, 1)
                
                renderizarModalCarrito()
            }
        })

        imagenProducto.src = producto.image
        imagenProducto.width = "75"
        imagenProducto.height = "75"
        tituloProducto.textContent = producto.title
        precioProductoCarrito.textContent = `$${precioProducto}`
        botonAgregar.textContent = "+"
        productoCantidad.textContent = producto.cantidad
        botonEliminar.textContent = "-"
        elementoProducto.appendChild(imagenProducto)
        elementoProducto.appendChild(tituloProducto)
        elementoProducto.appendChild(botonEliminar)
        elementoProducto.appendChild(productoCantidad)
        elementoProducto.appendChild(botonAgregar)
        elementoProducto.appendChild(precioProductoCarrito)
        listaProductosCarrito.appendChild(elementoProducto)

    })
}
mostrarTodosProductos()
mostrarCategorias()
