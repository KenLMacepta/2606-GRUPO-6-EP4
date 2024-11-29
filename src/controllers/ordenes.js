import Orden from "../model/ordenModel.js";
import Platillo from "../model/platilloModel.js";
import mongoose from "mongoose";


export const crearOrden = async (req, res) => {
    try {
        const { mesaId, platillos } = req.body;
        const platillosExistentes = await Platillo.find({
            '_id': { $in: platillos.map(p => new mongoose.Types.ObjectId(p.platilloId)) }
        });
        

        if (platillosExistentes.length !== platillos.length) {
            return res.status(400).json({ message: "Uno o más platillos no existen en la base de datos" });
        }


        const nuevaOrden = new Orden({
            mesaId,
            platillos
        });


        await nuevaOrden.save();
        res.status(201).json({ message: "Orden registrada con éxito", orden: nuevaOrden });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la orden", error: error.message });
    }
};


export const obtenerOrdenPorID = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await Orden.findOne({ mesaId: id }).populate('platillos.platilloId');

        if (!orden) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.status(200).json(orden);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la orden", error: error.message });
    }
};


export const actualizarEstadoOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (!["pendiente", "entregado", "cancelado"].includes(estado)) {
            return res.status(400).json({ message: "Estado inválido" });
        }


        const ordenActualizada = await Orden.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );

        if (!ordenActualizada) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.status(200).json({ message: "Estado de la orden actualizado", orden: ordenActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el estado de la orden", error: error.message });
    }
};


export const eliminarOrden = async (req, res) => {
    try {
        const { id } = req.params;

        const ordenEliminada = await Orden.findByIdAndDelete(id);

        if (!ordenEliminada) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.status(200).json({ message: "Orden eliminada con éxito", orden: ordenEliminada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la orden", error: error.message });
    }
};
