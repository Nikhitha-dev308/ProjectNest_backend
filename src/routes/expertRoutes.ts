import express, { Router } from 'express';
import { expertLogin, expertSignup ,fetchProjects} from '../controllers/expertController';

const router: any = express.Router();

// Define expert routes
router.post('/login', expertLogin);
router.post('/signup', expertSignup);
router.get('/projects',fetchProjects);

export default router;
