const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "ecommerce";

async function conectar() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

async function listarProductosMayorAlPromedio() {//es tambien el ejercicio numero 5
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

async function agruparPorCategoria() {
    const db = await conectar();
    const productos = db.collection("productos");
    const resultado = await productos.aggregate([
        { $group: { _id: "$categoria", cantidad: { $sum: 1 } } },
        { $sort: { cantidad: -1 } }
    ]).toArray();
    console.log("Productos agrupados por categoría:");
    resultado.forEach(group => {
        console.log(`   - ${group._id}: ${group.cantidad} productos`);
    });
    return resultado;
}

async function ordenarPrecioDesc() {
    const db = await conectar();
    const productos = db.collection("productos");
    const productosMasCaros = await productos.find().sort({ precio: -1 }).limit(3).toArray();
    console.log("Los 3 productos más caros:");
    productosMasCaros.forEach(producto => {
        console.log(`   - ${producto.nombre}: $${producto.precio.toFixed(2)}`);
    });
    return productosMasCaros;
}

(async () => {
    await listarProductosMayorAlPromedio();//tambien es el ejercicio numero 5
    console.log("\n" + "=".repeat(50));
    await agruparPorCategoria();
    console.log("\n" + "=".repeat(50));
    await ordenarPrecioDesc();
})();
