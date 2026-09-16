import Medicine from '../models/Medicine.js';
import Sale from '../models/Sale.js';

// @desc    Get Dashboard Stats (Revenue, Stock, Inventory Count)
// @route   GET /api/inventory/stats/summary
export const getDashboardStats = async (req, res) => {
    try {
        // 1. Total Medicines Count (Pure dynamic from DB)
        const totalMedicines = await Medicine.countDocuments();

        // 2. Low Stock Count (Medicines where stock is less than 15)
        const lowStock = await Medicine.countDocuments({ stock: { $lt: 15 } });

        // 3. Total Revenue Calculation (Sum of totalAmount from Sales collection)
        const salesStats = await Sale.aggregate([
            { 
                $group: { 
                    _id: null, 
                    totalRevenue: { $sum: "$totalAmount" } 
                } 
            }
        ]);
        
        const revenue = salesStats.length > 0 ? salesStats[0].totalRevenue : 0;

        // Sending complete stats object to frontend
        res.status(200).json({
            revenue: revenue,
            totalMedicines: totalMedicines,
            lowStock: lowStock,
            aiStatus: 'Active'
        });

    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// @desc    Add New Medicine
// @route   POST /api/inventory/add
export const addMedicine = async (req, res) => {
    try {
        const newMedicine = new Medicine(req.body);
        await newMedicine.save();
        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Get All Medicines
// @route   GET /api/inventory/list
export const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find().sort({ createdAt: -1 });
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update Medicine
// @route   PUT /api/inventory/update/:id
export const updateMedicine = async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedMedicine);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Delete Medicine
// @route   DELETE /api/inventory/delete/:id
export const deleteMedicine = async (req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Medicine deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};