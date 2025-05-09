import express, { Router } from 'express';
import { expertLogin, expertSignup, fetchProjects, profileData, updateProfile } from '../controllers/expertController';

const router: any = express.Router();

// Define expert routes
router.post('/login', expertLogin);
router.post('/signup', expertSignup);
router.get('/projects', fetchProjects);
router.get('/profiledata', profileData);
router.put('/updateprofile', updateProfile);

export default router;
