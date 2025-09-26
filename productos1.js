const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "ecommerce"

const productos=[
    //1 muebles
    {
        nombre:"Sillon cama Futón",
        categoria:"Muebles",
        precio:294000,
        stock:3,
        especificaciones:{
            renclinable: false,
            alto:"76 cm",
            ancho:"81 cm",
            profundidadOLargo:"176 cm"
        }
    },
    {
        nombre:"Sillon Poltrona Relax",
        categoria:"Muebles",
        precio:174000,
        stock:5,
        especificaciones:{
            renclinable: true,
            alto:"110 cm",
            ancho:"89 cm",
            profundidadOLargo:"75 cm"
        }   
    },
    {
        nombre:"Silla Gamer",
        categoria:"Muebles",
        precio:150000,
        stock:9,
        especificaciones:{
            renclinable: false,
            alto:"124 cm",
            ancho:"50 cm",
            profundidadOLargo:"50 cm"
        } 
    },
    {
        nombre:"Mesa de comedor con 6 sillas",
        categoria:"Muebles",
        precio:554000,
        stock:2,
        especificaciones:{
            renclinable: false,
            alto:"79 cm",
            ancho:"160 cm",
            profundidadOLargo:"90 cm"
        } 
    },
    {
        nombre:"Camas de Dos Plazas",
        categoria:"Muebles",
        precio:159184,
        stock:3,
        especificaciones:{
            renclinable: false,
            alto:"90 cm",
            ancho:"150 cm",
            profundidadOLargo:"211 cm"
        }
    },//2 Tecnología
    {
        nombre:"Tablet Lenovo",
        categoria:"Tecnologia",
        precio:422000,
        stock:20,
        especificaciones:{
            procesador:"MediaTek Helio G88(2,00 GHz)",
            memoria:"8GB",
            almacenamiento:" 128GB"
        } 
    },
    {
        nombre:"Celular Galaxy A56 5G",
        categoria:"Tecnologia",
        precio:999999,
        stock:18,
        especificaciones:{
            procesador:"Octa-Core 2.9GHz,2.6GHz,1.9G Hz",
            memoria:"256GB",
            almacenamiento:"256GB"
        } 
    },
    {
        nombre:"Pc Gamer Noxi",
        categoria:"Tecnologia",
        precio:648081,
        stock:18,
        especificaciones:{
            procesador:"AMD 5700G",
            memoria:"32 GB",
            almacenamiento:"1 TB"
        } 
    },
    {
        nombre:"Home Theater Equipo Musica Bluetooth Inalambrico Noga Spark",
        categoria:"Tecnologia",
        precio:96449,
        stock:14,
        especificaciones:{
            conectividad:"Bluetooth"
        }
    },
    {
        nombre:"Playstation 5 Slim Digital 1tb",
        categoria:"Tecnologia",
        precio:648081,
        stock:18,
        especificaciones:{
            procesador:"CPU(Amd ryzen),GPU(AMD Radeon)",
            memoria:"1 TB",
            almacenamiento:"1 TB"
        }
    },//3 Ciclismo
    {
        nombre:"Bicicleta Alpina 2.0 Pro Acero",
        categoria:"Ciclismo",
        precio:250599,
        stock:4,
        especificaciones:{
            rodado: 29,
            paraAdultos: true,
            tipoBicicleta: "Mountain bike",
            pesoMax: "115 kg"
        }
    },
    {
        nombre:"Bicicleta Infantil Dencar",
        categoria:"Ciclismo",
        precio:235400,
        stock:3,
        especificaciones:{
            rodado: 16,
            paraAdultos: false,
            tipoBicicleta: "Paseo",
            pesoMax: "27.8 kg"
        }
    },
    {
        nombre:"Bicicleta infantil Nathor",
        categoria:"Ciclismo",
        precio:79100,
        stock:2,
        especificaciones:{
            rodado: 12,
            paraAdultos: false,
            tipoBicicleta: "Paseo",
            pesoMax: "21kg"
        }
    },
    {
        nombre:"Bicimoto Playera",
        categoria:"Ciclismo",
        precio:680000,
        stock:4,
        especificaciones:{
            rodado: 29,
            paraAdultos: true,
            tipoBicicleta: "A PEDAL",
            pesoMax: "120 kg"
        }
    },
    {
        nombre:"Bicicleta Vintage Dama Con Cambios",
        categoria:"Ciclismo",
        precio:361000,
        stock:4,
        especificaciones:{
            rodado: 26,
            paraAdultos: true,
            tipoBicicleta: "De Paseo Con Cambios",
            pesoMax: "120 kg"
        }
    },//4 Herramientas 
    {
        nombre:"Taladro Electrico",
        categoria:"Herramientas",
        precio:119000,
        stock:4,
        especificaciones:{
            inalámbrico: false, 
            marca:"Bosch", 
            modelo:"GSB 13 RE"
        }
    },
    {
        nombre:"Taladro Electrico",
        categoria:"Herramientas",
        precio:46700,
        stock:6,
        especificaciones:{
            inalámbrico: false, 
            marca:"Omaha", 
            modelo:"PIDEWEB"
        }
    },
    {
        nombre:"Soplador Aspirador De Hojas",
        categoria:"Herramientas",
        precio:47845,
        stock:5,
        especificaciones:{
            inalámbrico: true, 
            marca:"VÖHLER VHSP700P", 
            modelo:"VHSP700P"
        }
    },
    {
        nombre:"Soplador Aspirador De Hojas",
        categoria:"Herramientas",
        precio:205900,
        stock:5,
        especificaciones:{
            inalámbrico: true, 
            marca:"VÖHLER", 
            modelo:"VHCO42K"
        }   
    },
    {
        nombre:"Cortadora De Césped ",
        categoria:"Herramientas",
        precio:699300,
        stock:5,
        especificaciones:{
            inalámbrico: true, 
            marca:"Total", 
            modelo:"TGT141181"
        }  
    },//5 Bebés&Niños
    {
        nombre:"Cama Elástica Trampolin ",
        categoria:"Bebes&Niños",
        precio:500000,
        stock:5,
        especificaciones:{
            paraBebes: false,
            marca:"Shine",
            modelo:"SDT-1003HI"
        }
    },
    {
        nombre:"Practicuna Colecho",
        categoria:"Bebes&Niños",
        precio:100000,
        stock:7,
        especificaciones:{
            paraBebes: true,
            marca:"Mu",
            modelo:"B612"
        }
    },
    {
        nombre:"Practicuna Colecho",
        categoria:"Bebes&Niños",
        precio:120000,
        stock:11,
        especificaciones:{
            paraBebes: true,
            marca:"Mu",
            modelo:"K8"
        }
    },
    {
        nombre:"Piso de Goma Eva Letras PGE-ABC",
        categoria:"Bebes&Niños",
        precio:65250,
        stock:7,
        especificaciones:{
            paraBebes: false,
            marca:"Rooby",
            modelo:""
        }
    },
    {
        nombre:"Cuatriciclo a Batería ",
        categoria:"Bebes&Niños",
        precio:85000,
        stock:9,
        especificaciones:{
            paraBebes: false,
            marca:"Stark",
            modelo:"Cuatriciclo"
        }
    }
]

async function insertarProductos() {
    let client;
    try {
        client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await client.connect();
        console.log("Conectado a MongoDB");

        const db = client.db(dbName);
        const collection = db.collection("productos");

        // Verificar si ya hay productos para evitar duplicados
        const countBefore = await collection.countDocuments();
        console.log(`Productos existentes antes de la inserción: ${countBefore}`);

        const resultado = await collection.insertMany(productos);
        console.log(`${resultado.insertedCount} productos insertados exitosamente`);

        // Verificar la inserción
        const countAfter = await collection.countDocuments();
        console.log(`Productos existentes después de la inserción: ${countAfter}`);

        // Listar los productos insertados 
        const productosInsertados = await collection.find({}).toArray();
        console.log("Productos en la base de datos:");
        productosInsertados.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (client) {
            await client.close();
            console.log('Conexión cerrada');
        }
    }
}

insertarProductos();
async function verificarInsercion() {
    let client;
    try {
        client = new MongoClient(url);
        await client.connect();
        
        const db = client.db(dbName);
        const collection = db.collection("productos");

        // Verificar por categorías
        const conteoPorCategoria = await collection.aggregate([
            { $group: { _id: "$categoria", count: { $sum: 1 } } }
        ]).toArray();

        console.log("\n📊 Productos por categoría:");
        conteoPorCategoria.forEach(cat => {
            console.log(`   ${cat._id}: ${cat.count} productos`);
        });

        // Verificar algunos productos específicos
        const productosMuebles = await collection.find({ categoria: "Muebles" }).toArray();
        console.log("\n🛋️  Productos de Muebles:");
        productosMuebles.forEach(producto => {
            console.log(`   - ${producto.nombre} (Stock: ${producto.stock})`);
        });
        async function actualizarPreciosPorCategoria() {
    let client;
    try {
        client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("productos");

        // Aumentar 15% a Tecnología
        const resultadoTecnologia = await collection.updateMany(
            { categoria: "Tecnologia" },
            { $mul: { precio: 1.15 } }
        );
        console.log(`📱 Productos de Tecnología modificados: ${resultadoTecnologia.modifiedCount}`);

        // Disminuir 5% a Muebles
        const resultadoMuebles = await collection.updateMany(
            { categoria: "Muebles" },
            { $mul: { precio: 0.95 } }
        );
        console.log(`🛋️ Productos de Muebles modificados: ${resultadoMuebles.modifiedCount}`);

        } catch (error) {
            console.error('Error al actualizar precios:', error);
        } finally {
            if (client) await client.close();
        }
    }
    async function verificarPreciosActualizados() {
    let client;
    try {
        client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("productos");
        const productosTecnologia = await collection.find({ categoria: "Tecnologia" }).toArray();
        console.log("\n📱 Productos de Tecnología (precios actualizados +15%):");
        productosTecnologia.forEach(producto => {
            console.log(`   - ${producto.nombre}: $${producto.precio.toFixed(2)}`);
        });
        const productosMuebles = await collection.find({ categoria: "Muebles" }).toArray();
        console.log("\n🛋️ Productos de Muebles (precios actualizados -5%):");
        productosMuebles.forEach(producto => {
            console.log(`   - ${producto.nombre}: $${producto.precio.toFixed(2)}`);
        });

    } catch (error) {
        console.error('Error al verificar precios:', error);
    } finally {
        if (client) await client.close();
    }
}



    } catch (error) {
        console.error('Error en verificación:', error);
    } finally {
        if (client) await client.close();
    }
}

listarProductosMayorAlPromedio().catch(console.error);
insertarProductos().then(() => {
    console.log("\n" + "=".repeat(50));
    verificarInsercion().then(() => {
        console.log("\n" + "=".repeat(50));
        actualizarPreciosPorCategoria().then(() => {
            console.log("\n" + "=".repeat(50));
            verificarPreciosActualizados();
        });
    });
});
