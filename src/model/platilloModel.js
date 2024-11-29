import mongoose from "mongoose";


const PlatilloSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    ingredientes: {
        type: [String],
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    imagen: {
        type: String,
        required: false
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});


const Platillo = mongoose.model("Platillo", PlatilloSchema);
export default Platillo;
