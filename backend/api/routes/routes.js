import express from 'express';
import { addRSO, deleteRSO, editRSO } from '../controllers/rsoController.js';
import { loginUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/rso/add', addRSO);
router.delete('/rso/delete/:rsold', deleteRSO);
router.put('/rso/edit/:rsold', editRSO);

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
