
import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process?.env?.mongoURI, { useNewUrlParser: true });
        console.log('DB Connected Successfully')
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection