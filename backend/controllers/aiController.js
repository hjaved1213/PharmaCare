import Medicine from '../models/Medicine.js';
import Sale from '../models/Sale.js';

export const processNaturalLanguage = async (req, res) => {
    const { prompt } = req.body;
    const lowerPrompt = prompt.toLowerCase();

    try {
        let aiResponse = "";

        if (lowerPrompt.includes("sale") || lowerPrompt.includes("revenue")) {
            // Lab 03: Aggregation Pipeline use kar ke dynamic total nikalna
            const salesData = await Sale.aggregate([
                { $group: { _id: null, total: { $sum: "$totalAmount" }, count: { $sum: 1 } } }
            ]);
            const total = salesData.length > 0 ? salesData[0].total : 0;
            const count = salesData.length > 0 ? salesData[0].count : 0;
            aiResponse = `Analyzing live sales... Total revenue is Rs. ${total.toLocaleString()} from ${count} transactions today.`;
        } 
        else if (lowerPrompt.includes("stock") || lowerPrompt.includes("inventory")) {
            // Lab 07: Fast indexing query for low stock
            const lowStockItems = await Medicine.find({ stock: { $lt: 20 } }).limit(5);
            const names = lowStockItems.map(m => m.name).join(", ");
            aiResponse = lowStockItems.length > 0 
                ? `I found ${lowStockItems.length} items low on stock, including: ${names}.`
                : "Inventory is healthy. No items are below the safety threshold.";
        }
        else {
            aiResponse = "I'm connected to the database. Ask me about 'sales' or 'stock' for real-time insights!";
        }

        res.status(200).json({ success: true, message: aiResponse });
    } catch (error) {
        res.status(500).json({ error: 'AI Error: ' + error.message });
    }
};