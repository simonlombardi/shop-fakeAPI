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
    console.log(detalleProducto);
}

mostrarCategorias()
