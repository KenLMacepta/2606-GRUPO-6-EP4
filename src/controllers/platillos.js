import Platillo from "../model/platilloModel.js";

export const crearPlatillo = async (req, res) => {
    try {
        const { nombre, ingredientes, precio, imagen } = req.body;

        const nuevoPlatillo = new Platillo({
            nombre,
            ingredientes,
            precio,
            imagen
        });

        await nuevoPlatillo.save();

        res.status(201).json({
            message: "Platillo creado con éxito",
            platillo: nuevoPlatillo
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el platillo", error });
    }
};



export const obtenerPlatilloPorID = async (req, res) => {
    try {
        const { id } = req.params;
        const platillo = await Platillo.findById(id);

        if (!platillo) {
            return res.status(404).json({ message: "Platillo no encontrado" });
        }

        res.status(200).json(platillo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el platillo", error });
    }
};


export const actualizarPlatillo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, ingredientes, precio, imagen } = req.body;

        const platilloActualizado = await Platillo.findByIdAndUpdate(
            id,
            { nombre, ingredientes, precio, imagen },
            { new: true }
        );

        if (!platilloActualizado) {
            return res.status(404).json({ message: "Platillo no encontrado" });
        }

        res.status(200).json({
            message: "Platillo actualizado con éxito",
            platillo: platilloActualizado
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el platillo", error });
    }
};


export const eliminarPlatillo = async (req, res) => {
    try {
        const { id } = req.params;

        const platilloEliminado = await Platillo.findByIdAndDelete(id);

        if (!platilloEliminado) {
            return res.status(404).json({ message: "Platillo no encontrado" });
        }

        res.status(200).json({
            message: "Platillo eliminado con éxito",
            platillo: platilloEliminado
        });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el platillo", error });
    }
};
