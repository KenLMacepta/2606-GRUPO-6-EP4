import express from "express";
import mongoose from "mongoose";
import clienteRoutes from "./routes/cliente.routes.js";
import platillosRoutes from "./routes/platillo.routes.js";
import ordenesRoutes from "./routes/ordenes.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import meseroRoutes from "./routes/mesero.routes.js";

const app = express();

app.use(express.json());

app.use("/api", clienteRoutes);
app.use("/api", platillosRoutes);
app.use("/api", ordenesRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", meseroRoutes);

mongoose
    .connect("mongodb://127.0.0.1:27017/sistema", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión a MongoDB exitosa"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
