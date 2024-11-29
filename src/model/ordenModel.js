import mongoose from "mongoose";

const OrdenSchema = new mongoose.Schema({
    mesaId: {
        type: String,
        required: true
    },
    platillos: [
        {
            platilloId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Platillo',
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    estado: {
        type: String,
        enum: ["pendiente", "entregado", "cancelado"],
        default: "pendiente"
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

const Orden = mongoose.model("Orden", OrdenSchema);
export default Orden;
