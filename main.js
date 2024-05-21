let productosCarrito = []
const botonCarrito = document.getElementById("botonCarrito")

botonCarrito.addEventListener("click", () => {
    renderizarModalCarrito()
})

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

const mostrarCategorias = async () => {
    let categorias = await obtenerCategorias()
    const listaCategoria = document.getElementById("listaCategorias")
    categorias.forEach(categoria => {
        const elementoCategoria = document.createElement("li")
        const enlace = document.createElement("a")
        enlace.textContent = categoria
        enlace.addEventListener("click", () => {
            mostrarProductosCategoria(categoria)
        })
        elementoCategoria.appendChild(enlace)
        elementoCategoria.style.cursor = "pointer"
        listaCategoria.appendChild(elementoCategoria)
    });
}

const mostrarProductosCategoria = async (categoria) => {
    let productosCategoria = await obtenerProductosCategoria(categoria)
    const listaProductosCategoria = document.getElementById("productosCategoria")
    while (listaProductosCategoria.firstChild){
        listaProductosCategoria.removeChild(listaProductosCategoria.firstChild)
    }
    productosCategoria.forEach(producto => {
        const elementoProducto = document.createElement("li")
        const elementoTitulo = document.createElement("h3")
        const elementoPrecio = document.createElement("h4")
        const elementoImagen = document.createElement("img")
        elementoImagen.width = 100
        elementoImagen.height = 100
        elementoTitulo.textContent = producto.title
        elementoPrecio.textContent = `$${producto.price}`
        elementoImagen.src = producto.image
        elementoProducto.appendChild(elementoTitulo)
        elementoProducto.appendChild(elementoPrecio)
        elementoProducto.appendChild(elementoImagen)
        elementoTitulo.addEventListener("click", () => {
            mostrarDetalleProducto(producto)
        })
        elementoTitulo.style.cursor = "pointer"
        listaProductosCategoria.appendChild(elementoProducto)
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
        productosCarrito.push(detalleProducto)
        alert(`${detalleProducto.title} agregado al carrito!`)
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
    console.log(productosCarrito);
    const modal = document.getElementById("modalCarrito")
    const contenedorModalCarrito = document.getElementById("listaModalCarrito")
    const cancelar = document.getElementById("cancelarCompra")

    cancelar.addEventListener("click", () => {
        modal.style.display = 'none'
        contenedorModalCarrito.style.position = "inherit"
        contenedorModalCarrito.style.height = "auto"
        contenedorModalCarrito.style.overflow = "visible"
    })

    modal.style.display = 'block'
    contenedorModalCarrito.style.position = "static"
    contenedorModalCarrito.style.height = "100%"
    contenedorModalCarrito.style.overflow = "hidden"

    productosCarrito.forEach(producto => {
        let cantidadProducto = 1
        const listaProductosCarrito = document.getElementById("listaModalCarrito")
        const elementoProducto = document.createElement("ul")
        const imagenProducto = document.createElement("img")
        const tituloProducto = document.createElement("span")
        const precioProductoCarrito = document.createElement("span")
        const botonEliminar = document.createElement("button")
        const botonAgregar = document.createElement("button")
        const cantidad = document.createElement("span")
        let precioProducto = (cantidadProducto * (parseInt(producto.price)))
        botonAgregar.addEventListener("click", () => {
            cantidadProducto += 1
            cantidad.textContent = cantidadProducto
            precioProducto = (cantidadProducto * (parseInt(producto.price)))
            precioProductoCarrito.textContent = `$${precioProducto}`
            
        })
        botonEliminar.addEventListener("click", () => {
            elementoProducto.removeChild(precioProductoCarrito)
            cantidadProducto -= 1
            cantidad.textContent = cantidadProducto
            precioProducto = (cantidadProducto * (parseInt(producto.price)))
            precioProductoCarrito.textContent = `$${precioProducto}`
            elementoProducto.appendChild(precioProductoCarrito)
            if(cantidadProducto < 1){
                productosCarrito = productosCarrito.filter(productoCarrito => productoCarrito.id == producto.id)
                renderizarModalCarrito()
            }
        })

        imagenProducto.src = producto.image
        imagenProducto.width = "75"
        imagenProducto.height = "75"
        tituloProducto.textContent = producto.title
        precioProductoCarrito.textContent = `$${precioProducto}`
        botonAgregar.textContent = "+"
        cantidad.textContent = cantidadProducto
        botonEliminar.textContent = "-"
        elementoProducto.appendChild(imagenProducto)
        elementoProducto.appendChild(tituloProducto)
        elementoProducto.appendChild(botonEliminar)
        elementoProducto.appendChild(cantidad)
        elementoProducto.appendChild(botonAgregar)
        elementoProducto.appendChild(precioProductoCarrito)
        listaProductosCarrito.appendChild(elementoProducto)
        console.log(cantidadProducto);




    })
}

mostrarCategorias()
