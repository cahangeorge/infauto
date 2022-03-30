import mongoose from "mongoose"

const carSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    chassis: {
        type: String,
        required: true,
        unique: true,
        min: 17,
        max: 17
    },
    registration_number: {
        type: String,
        required: true,
        min: 6,
        max: 7
    },
    brand: {
        type: String,
        required: true,
    },
    manufacturing_year: {
        type: String,
        required: true,
    },
    expiry_rca: {
        type: String
    },
    expiry_itp: {
        type: String
    },
    expiry_rovinieta: {
        type: String
    }
}, { timestamps: true })

const Car = mongoose.model('car', carSchema);

export default Car;