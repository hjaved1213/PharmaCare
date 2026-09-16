import express from 'express';
import { addSale, getSalesHistory } from '../controllers/salesController.js';

const router = express.Router();

router.post('/add', addSale);
router.get('/history', getSalesHistory);

export default router;