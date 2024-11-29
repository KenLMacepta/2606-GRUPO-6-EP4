import express from "express";
import {
    crearOrden,
    obtenerOrdenPorID,
    actualizarEstadoOrden,
    eliminarOrden
} from "../controllers/ordenes.js";

const router = express.Router();

router.post("/addOrden", crearOrden);
router.get("/orden/:id", obtenerOrdenPorID);
router.put("/orden/:id", actualizarEstadoOrden);
router.delete("/orden/:id", eliminarOrden);

export default router;
