import express from "express";
import {
    registrarCliente,
    obtenerClientePorID,
    actualizarCliente,
    eliminarCliente,
} from "../controllers/clientes.js";

const router = express.Router();

router.post("/addCliente", registrarCliente);
router.get("/cliente/:id", obtenerClientePorID);
router.put("/cliente/:id", actualizarCliente);
router.delete("/cliente/:id", eliminarCliente);

export default router;
