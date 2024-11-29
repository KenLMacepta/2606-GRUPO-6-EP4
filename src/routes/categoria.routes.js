import express from "express";
import {
    crearCategoria,
    obtenerTodasLasCategorias,
    actualizarCategoria,
    eliminarCategoria
} from "../controllers/categorias.js";

const router = express.Router();


router.post("/addCategoria", crearCategoria);
router.get("/categorias", obtenerTodasLasCategorias);
router.put("/categoria/:id", actualizarCategoria);
router.delete("/categoria/:id", eliminarCategoria);

export default router;
