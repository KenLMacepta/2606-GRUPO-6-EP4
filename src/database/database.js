import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/sistema", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado a MongoDB, base de datos: 'sistema'");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
