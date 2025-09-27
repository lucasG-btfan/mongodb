const { MongoClient } = require("mongodb");
const fs = require("fs"); 
const url = "mongodb://localhost:27017";
const dbName = "ecommerce";

async function conectar() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

async function exportarProductos() {
    try {
        const db = await conectar();
        const productos = await db.collection("productos").find().toArray();
        const productosJSON = JSON.stringify(productos, null, 2); 
        fs.writeFileSync("./exportados.json", productosJSON);

        console.log("Archivo exportados.json generado correctamente.");
    } catch (error) {
        console.error("Error al exportar productos:", error);
    }
}
exportarProductos();
