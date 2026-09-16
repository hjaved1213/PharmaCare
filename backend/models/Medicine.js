import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true }, 
    stock: { type: Number, required: true },
    expiryDate: { type: Date, required: true }, 
    supplier: { type: String, required: true }
}, { timestamps: true });

medicineSchema.index({ name: 1, stock: 1 });

medicineSchema.index({ expiryDate: 1 });

export default mongoose.model('Medicine', medicineSchema);