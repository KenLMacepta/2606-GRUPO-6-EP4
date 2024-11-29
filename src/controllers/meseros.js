import Mesero from "../model/meseroModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const crearMesero = async (req, res) => {
    try {
        const { nombre, usuario, contraseña, dni } = req.body;

        const meseroExistente = await Mesero.findOne({ $or: [{ usuario }, { dni }] });
        if (meseroExistente) {
            return res.status(400).json({ message: "El usuario o DNI ya está registrado" });
        }

        const nuevoMesero = new Mesero({ nombre, usuario, contraseña, dni });

        await nuevoMesero.save();
        res.status(201).json({ message: "Mesero creado con éxito", mesero: nuevoMesero });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el mesero", error: error.message });
    }
};


export const obtenerTodosLosMeseros = async (req, res) => {
    try {
        const meseros = await Mesero.find();

        if (meseros.length === 0) {
            return res.status(404).json({ message: "No hay meseros disponibles" });
        }

        res.status(200).json(meseros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los meseros", error: error.message });
    }
};

export const obtenerMeseroPorID = async (req, res) => {
    try {
        const { id } = req.params;
        const mesero = await Mesero.findById(id);

        if (!mesero) {
            return res.status(404).json({ message: "Mesero no encontrado" });
        }

        res.status(200).json(mesero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el mesero", error: error.message });
    }
};

export const actualizarMesero = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, usuario, contraseña, dni } = req.body;

        const meseroActualizado = await Mesero.findByIdAndUpdate(
            id,
            { nombre, usuario, contraseña, dni },
            { new: true }
        );

        if (!meseroActualizado) {
            return res.status(404).json({ message: "Mesero no encontrado" });
        }

        res.status(200).json({ message: "Mesero actualizado con éxito", mesero: meseroActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el mesero", error: error.message });
    }
};

export const eliminarMesero = async (req, res) => {
    try {
        const { id } = req.params;
        const meseroEliminado = await Mesero.findByIdAndDelete(id);

        if (!meseroEliminado) {
            return res.status(404).json({ message: "Mesero no encontrado" });
        }

        res.status(200).json({ message: "Mesero eliminado con éxito", mesero: meseroEliminado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el mesero", error: error.message });
    }
};

export const loginMesero = async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;

        const mesero = await Mesero.findOne({ usuario });
        if (!mesero) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const esValido = await mesero.compararContraseña(contraseña);
        if (!esValido) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ meseroId: mesero._id, usuario: mesero.usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login exitoso", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al autenticar al mesero", error: error.message });
    }
};
