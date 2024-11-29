import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

const Categoria = mongoose.model("Categoria", CategoriaSchema);
export default Categoria;
