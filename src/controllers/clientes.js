import ClienteModel from "../model/clienteModel.js";

export const registrarCliente = async (req, res) => {
    try {
        const { nombre, email, telefono, dni } = req.body;

        const nuevoCliente = new ClienteModel({ nombre, email, telefono, dni });
        await nuevoCliente.save();

        res.status(201).json({ message: "Cliente registrado con éxito", cliente: nuevoCliente });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el cliente", error });
    }
};


export const obtenerClientePorID = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await ClienteModel.findById(id);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error });
    }
};

export const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, dni, telefono } = req.body;


        const clienteActualizado = await ClienteModel.findByIdAndUpdate(
            id,
            { email, dni, telefono },
            { new: true } 
        );

        if (!clienteActualizado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.status(200).json({ message: "Cliente actualizado con éxito", cliente: clienteActualizado });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el cliente", error });
    }
};

export const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const clienteEliminado = await ClienteModel.findByIdAndDelete(id);

        if (!clienteEliminado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.status(200).json({ message: "Cliente eliminado con éxito", cliente: clienteEliminado });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente", error });
    }
};
