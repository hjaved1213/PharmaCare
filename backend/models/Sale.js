import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    items: [
        {
            medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: { type: Number, required: true },
    saleDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Sale', saleSchema);