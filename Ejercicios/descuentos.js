const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "ecommerce";

async function conectar() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

async function descuento() {
    const db = await conectar();
    const collection = db.collection("productos");
    const diezxCiento = await collection.updateMany(
        { precio: { $gt: 1000 } },
        { $mul: { precio: 0.9 } }
    );
    console.log(`Productos con 10% de descuento (precio > 1000): ${diezxCiento.modifiedCount}`);

    const cincoxCiento = await collection.updateMany(
        { precio: { $gte: 100, $lte: 500 } },
        { $mul: { precio: 0.95 } }
    );
    console.log(`Productos con 5% de descuento (precio 100-500): ${cincoxCiento.modifiedCount}`);

    const productosActualizados = await collection.find({}).sort({ precio: -1 }).toArray();   
    console.log("LISTA COMPLETA DE PRODUCTOS CON PRECIOS ACTUALIZADOS:");
    console.log("===========================================================");
    
    productosActualizados.forEach(producto => {
        console.log(`📦 ${producto.nombre}`);
        console.log(`   Categoría: ${producto.categoria}`);
        console.log(`   Precio: $${producto.precio.toFixed(2)}`);
        console.log("   ---");
    });
    
    console.log(`\n📈 Total de productos: ${productosActualizados.length}`);
    return productosActualizados;
}

(async () => {
    await descuento();
    console.log("\n" + "=".repeat(50));
    
})();
