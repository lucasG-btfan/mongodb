const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "ecommerce";

async function conectar() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

async function listarCategoriasMayorAlPromedio() {
    const db = await conectar();
    const productos = db.collection("productos");
    
    const resultadoPromedio = await productos.aggregate([
        { $group: { _id: null, promedio: { $avg: "$precio" } } }
    ]).toArray();
    const promedio = resultadoPromedio[0].promedio;
    console.log(`El promedio de precios es: $${promedio.toFixed(2)}`);
    
    const categoriasConPromedio = await productos.aggregate([
        {
            $group: {
                _id: "$categoria",
                promedioCategoria: { $avg: "$precio" },
                cantidadProductos: { $sum: 1 }
            }
        },
        { $match: { promedioCategoria: { $gt: promedio } } },
        { $sort: { promedioCategoria: -1 } }, 
        { $limit: 2 } 
    ]).toArray();
    
    console.log("Las 2 categorías con mayor promedio de precios:");
    categoriasConPromedio.forEach((categoria, index) => {
        console.log(`${index + 1}. ${categoria._id}: $${categoria.promedioCategoria.toFixed(2)} (${categoria.cantidadProductos} productos)`);
    });
    
    return categoriasConPromedio;
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


(async () => {
    await agruparPorCategoria();
    console.log("\n" + "=".repeat(50));
    await listarCategoriasMayorAlPromedio();
    console.log("\n" + "=".repeat(50));
   
})();
