import express from "express";
import {
    crearPlatillo,
    obtenerPlatilloPorID,
    actualizarPlatillo,
    eliminarPlatillo
} from "../controllers/platillos.js";

const router = express.Router();


router.post("/addPlatillo", crearPlatillo);
router.get("/platillo/:id", obtenerPlatilloPorID);
router.put("/platillo/:id", actualizarPlatillo);
router.delete("/platillo/:id", eliminarPlatillo);

export default router;
