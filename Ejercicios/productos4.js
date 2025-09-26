const { MongoClient } = require("mongodb");
const fs = require("fs");
const url = "mongodb://localhost:27017";
const dbName = "ecommerce";

async function conectar() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

async function importarDatos() {
    try {
        const datos = fs.readFileSync("./datos.json", "utf-8");
        const productos = JSON.parse(datos);

        const db = await conectar();
        const collection = db.collection("productos");

        const resultado = await collection.insertMany(productos);
        console.log(` ${resultado.insertedCount} productos importados correctamente.`);
    } catch (error) {
        console.error(" Error al importar datos:", error);
    }
}

async function mostrarTodosLosProductos() {
    const db = await conectar();
    const productos = await db.collection("productos").find().toArray();
    productos.forEach((producto) => {
        console.log(`Producto: ${producto.nombre}, Precio: $${producto.precio.toFixed(2)}`);
    });
}

(async () => {
    await importarDatos();
    console.log("\n" + "=".repeat(50));
    await mostrarTodosLosProductos();
    console.log("\n" + "=".repeat(50));
})();
