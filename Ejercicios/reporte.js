const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "ecommerce"

async function conectar() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

async function listarProductosMayorAlPromedio() {
    const db = await conectar();
    const productos = db.collection("productos");
    const resultadoPromedio = await productos.aggregate([
        { $group: { _id: null, promedio: { $avg: "$precio" } } }
    ]).toArray();
    const promedio = resultadoPromedio[0].promedio;
    console.log(`El promedio de precios es: $${promedio.toFixed(2)}`);
    const productosMayores = await productos.find({ precio: { $gt: promedio } }).toArray();
    console.log("🔍 Productos con precio mayor al promedio:");
    productosMayores.forEach(producto => {
        console.log(`   - ${producto.nombre}: $${producto.precio.toFixed(2)}`);
    });
    return productosMayores;
}

(async () => {
    await listarProductosMayorAlPromedio();
    console.log("\n" + "=".repeat(50));
    
})();
