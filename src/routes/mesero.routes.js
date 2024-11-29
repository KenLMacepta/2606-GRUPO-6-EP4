import express from "express";
import {
    crearMesero,
    obtenerTodosLosMeseros,
    actualizarMesero,
    eliminarMesero,
    loginMesero
} from "../controllers/meseros.js";

const router = express.Router();

router.post("/addMesero", crearMesero); 
router.get("/meseros", obtenerTodosLosMeseros); 
router.put("/mesero/:id", actualizarMesero); 
router.delete("/mesero/:id", eliminarMesero);

router.post("/login", loginMesero);

export default router;
