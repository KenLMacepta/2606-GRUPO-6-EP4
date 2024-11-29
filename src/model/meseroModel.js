import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MeseroSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

MeseroSchema.pre("save", async function(next) {
    if (this.isModified("contraseña") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.contraseña = await bcrypt.hash(this.contraseña, salt);
    }
    next();
});

MeseroSchema.methods.compararContraseña = async function(contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};

const Mesero = mongoose.model("Mesero", MeseroSchema);
export default Mesero;
