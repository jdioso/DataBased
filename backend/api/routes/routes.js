import express from 'express';
import { addRSO, deleteRSO, editRSO } from '../controllers/rsoController.js';

const router = express.Router();

router.post('/rso/add', addRSO);
router.delete('/rso/delete/:rsold', deleteRSO);
router.put('/rso/edit/:rsold', editRSO);

export default router;
