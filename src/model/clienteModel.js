import mongoose from "mongoose";


const ClienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    telefono: {
        type: String,
        required: false,
        trim: true,
    },
    dni: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
});

const Cliente = mongoose.model("Cliente", ClienteSchema);
export default Cliente;
