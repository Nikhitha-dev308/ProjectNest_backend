"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import controller methods
const studentController_1 = require("../controllers/studentController");
const router = express_1.default.Router();
// Define routes
router.get('/dashboard', studentController_1.getDashboard);
router.post('/createproject', studentController_1.createProject);
router.post('/login', studentController_1.Login);
router.post('/signup', studentController_1.signup);
router.post('/submitIdea', studentController_1.submitIdea);
router.get('/profiledata', studentController_1.profileData);
router.put('/updateprofile', studentController_1.updateProfile);
exports.default = router;
