import Categoria from "../model/categoriaModel.js";

export const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const categoriaExistente = await Categoria.findOne({ nombre });
        if (categoriaExistente) {
            return res.status(400).json({ message: "Ya existe una categoría con ese nombre" });
        }

        const nuevaCategoria = new Categoria({ nombre, descripcion });

        await nuevaCategoria.save();
        res.status(201).json({ message: "Categoría creada con éxito", categoria: nuevaCategoria });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la categoría", error: error.message });
    }
};

export const obtenerTodasLasCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();

        if (categorias.length === 0) {
            return res.status(404).json({ message: "No hay categorías disponibles" });
        }

        res.status(200).json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las categorías", error: error.message });
    }
};

export const obtenerCategoriaPorID = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.status(200).json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la categoría", error: error.message });
    }
};

export const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            id,
            { nombre, descripcion },
            { new: true }
        );

        if (!categoriaActualizada) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.status(200).json({ message: "Categoría actualizada con éxito", categoria: categoriaActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la categoría", error: error.message });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaEliminada = await Categoria.findByIdAndDelete(id);

        if (!categoriaEliminada) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.status(200).json({ message: "Categoría eliminada con éxito", categoria: categoriaEliminada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la categoría", error: error.message });
    }
};
