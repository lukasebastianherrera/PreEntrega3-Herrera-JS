class BaseDeDatos{
    constructor(){
        this.productos = [];
        this.agregarRegistro(1, "biblioteca" , 100, "alimentos", "biblioteca.jpg");
        this.agregarRegistro(2, "colchon" , 50, "alimentos", "colchon.jpg");
        this.agregarRegistro(3, "pileta" , 150, "alimentos", "pileta.jpg");
        this.agregarRegistro(4, "ventilador" , 150, "alimentos", "ventilador.jpg");
    }
    
    agregarRegistro(id, nombre, precio, categoria, imagen){
        const producto = new Producto(id, nombre, precio, categoria, imagen);
        this.productos.push(producto);
    }
    traerRegistros() {
        return this.productos;
    }
    registroPorId(id) {
        return this.productos.find((producto) => producto.id === id);
    }
}

class Producto {
    constructor(id, nombre, precio, categoria, imagen = false){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

class Carrito{
    constructor(){
        this.carrito = [];
        this.total = 0;
        this.totalProductos = 0;
    }
    estaEnCarrito({ id }){
        return this.carrito.find((producto) => producto.id === id)
    }
    agregar(producto){
        const productoEnCarrito = this.estaEnCarrito(producto);
        if(productoEnCarrito){
            productoEnCarrito.cantidad++;
        }else {
            this.carrito.push({ ...producto, cantidad: 1 })
        }
        this.listar();
    }

    quitar(id){
        const indice =  this.carrito.findIndex((producto) => producto.id === id);
        if(this.carrito[indice].cantidad > 1){
            this.carrito[indice].cantidad--;
        } else { 
            this.carrito.splice(indice, 1);
        }
        this.listar();
    }

    listar(){
        this.total = 0;
        this.totalProductos = 0;
        divCarrito.innerHTML = "";
        for (const producto of this.carrito){
            divCarrito.innerHTML += `
            <div class="producto">
                <h2>${producto.nombre}</h2>
                <p>$${producto.precio}</p>
                <p>Cantidad${producto.cantidad}</p>
                <a href="#" data-id="${producto.id}" class="btnQuitar">Quitar del carrito</a>
            </div>`
            this.total += (producto.precio * producto.cantidad);
            this.producto += producto.cantidad;
        }
        const botonesQuitar = document.querySelectorAll(".btnQuitar");
        for (const boton of botonesQuitar){
            boton.onclick = (event) =>{
                event.preventDefault();
                this.quitar(Number(boton.dataset.id));

            }
        }
        spanTotalCarrito.innerText = this.total
        spanCantidadProductos.innerText = this.totalProductos;

    }
}

const bd = new BaseDeDatos();

const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito")
const spanCantidadProductos = document.querySelector("#cantidadProductos")
const spanTotalCarrito = document.querySelector("#totalCarrito")

cargarProductos();


function cargarProductos(){
    const productos  = bd.traerRegistros();
    for (const producto of productos){
        divProductos.innerHTML += `
        <div class="producto">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <img src="img/${producto.imagen}" width="150" />"
            <p><a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a></p>
        </div>
    `;  
    }
    const botonesAgregar = document.querySelectorAll(".btnAgregar");
    for (const boton of botonesAgregar){
        boton.addEventListener("click", (event) => {
            event.preventDefault();
            const id = Number(boton.dataset.id);
            const producto = bd.registroPorId(id);
            carrito.agregar(producto);
        })
    }
}

const carrito = new Carrito();