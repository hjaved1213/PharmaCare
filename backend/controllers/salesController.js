import Sale from '../models/Sale.js';
import Medicine from '../models/Medicine.js';

export const addSale = async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        // 1. Sale record create karein
        const newSale = new Sale({
            items: items.map(item => ({
                medicineId: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount
        });

        await newSale.save();

        // 2. Inventory se stock minus karein (Atomic update)
        for (const item of items) {
            await Medicine.findByIdAndUpdate(item._id, {
                $inc: { stock: -item.quantity }
            });
        }

        res.status(201).json({ message: "Sale Successful", sale: newSale });
    } catch (error) {
        console.error("Sale Controller Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getSalesHistory = async (req, res) => {
    try {
        const sales = await Sale.find().sort({ saleDate: -1 });
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};