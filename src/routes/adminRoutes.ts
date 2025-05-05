import express, { Router } from 'express';
import { adminLogin, adminSignup } from '../controllers/adminController';

const router: Router = express.Router();

// Define admin routes
router.post('/login', adminLogin);
router.post('/signup', adminSignup);

export default router;
