// Update imports to ESM syntax
import express from 'express';
import rsoController from '../controllers/rsoController.js';

const router = express.Router();

// // User routes
// router.post('/register', userController.register);
// router.post('/login', userController.login);

// RSO routes
router.post('/rso/add', rsoController.addRSO);
router.delete('/rso/delete/:rsold', rsoController.deleteRSO); // Made route consistent with RESTful practices
router.put('/rso/edit/:rsold', rsoController.editRSO);

// Export router using ESM syntax
export default router;
