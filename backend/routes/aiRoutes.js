import express from 'express';
import { processNaturalLanguage } from '../controllers/aiController.js';

const router = express.Router();

router.post('/command', processNaturalLanguage);

export default router;