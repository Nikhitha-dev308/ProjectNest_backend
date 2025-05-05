import express, { Router } from 'express';

// Import controller methods
import { getDashboard, createProject, Login, signup, submitIdea } from '../controllers/studentController';

const router: any = express.Router();

// Define routes
router.get('/dashboard', getDashboard);
router.post('/createproject', createProject);
router.post('/login', Login);
router.post('/signup', signup);
router.post('/submitIdea', submitIdea);

export default router;
