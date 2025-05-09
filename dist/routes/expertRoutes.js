"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expertController_1 = require("../controllers/expertController");
const router = express_1.default.Router();
// Define expert routes
router.post('/login', expertController_1.expertLogin);
router.post('/signup', expertController_1.expertSignup);
router.get('/projects', expertController_1.fetchProjects);
router.get('/profiledata', expertController_1.profileData);
router.put('/updateprofile', expertController_1.updateProfile);
exports.default = router;
