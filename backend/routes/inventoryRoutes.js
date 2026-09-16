import express from 'express';
import {
    addMedicine,
    getMedicines,
    updateMedicine,
    deleteMedicine,
    getDashboardStats // Naya function import kiya
} from '../controllers/inventoryController.js';

const router = express.Router();

// Dashboard Stats Route
router.get('/stats/summary', getDashboardStats);

// Inventory CRUD Routes
router.post('/add', addMedicine);           
router.get('/list', getMedicines);          
router.put('/update/:id', updateMedicine);  
router.delete('/delete/:id', deleteMedicine); 

export default router;