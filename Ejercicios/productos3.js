const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "ecommerce";

async function conectar() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

async function mostrarTodosLosProductos() {
    const db = await conectar();
    const productos = await db.collection("productos").find().toArray();
    productos.forEach((producto) => {
        console.log(`Producto: ${producto.nombre}, Precio: $${producto.precio.toFixed(2)}`);
    });
}

async function precioMenorIgual0() {
    const db = await conectar();
    const productos = db.collection("productos");
    const cantidad = await productos.countDocuments({ precio: { $lte: 0 } });
    console.log(`Cantidad de productos con precio menor o igual a 0: ${cantidad}`);
    const productosNegativos = await productos.find({ precio: { $lte: 0 } }).toArray();
    if (productosNegativos.length > 0) {
        console.log("Productos con precio ≤ 0:");
        productosNegativos.forEach((producto) => {
            console.log(`   - ${producto.nombre}: $${producto.precio.toFixed(2)}`);
        });
    } else {
        console.log("No hay productos con precio menor o igual a 0.");
    }
    return cantidad;
}

async function validarPreciosProductos() {
    const db = await conectar();
    const productos = await db.collection("productos").find().toArray();
    let hayErrores = false;
    productos.forEach((producto) => {
        if (producto.precio <= 0) {
            console.log(`Error: producto "${producto.nombre}" tiene precio inválido ($${producto.precio.toFixed(2)})`);
            hayErrores = true;
        }
    });
    if (!hayErrores) {
        console.log("Todos los productos son válidos.");
    }
}

(async () => {
    await mostrarTodosLosProductos();
    console.log("\n" + "=".repeat(50));
    await precioMenorIgual0();
    console.log("\n" + "=".repeat(50));
    await validarPreciosProductos();
})();
