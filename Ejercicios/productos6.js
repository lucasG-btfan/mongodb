const { MongoClient } = require("mongodb");
const fs = require("fs");
const url = "mongodb://localhost:27017";
const dbName = "ecommerce";

async function conectar() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

async function EliminarMenor100() {
    const db = await conectar();
    const collection = db.collection("productos");
    const resultado = await collection.deleteMany({ precio: { $lt: 100 } });

    console.log(` ${resultado.deletedCount} productos con precio menor a 100 fueron eliminados.`);
}

(async () => {
    await EliminarMenor100();
    console.log("\n" + "=".repeat(50))
})();
