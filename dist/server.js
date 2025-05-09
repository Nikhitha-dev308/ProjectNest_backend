"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const expertRoutes_1 = __importDefault(require("./routes/expertRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const db_1 = __importDefault(require("./config/db"));
const ExpressApp = (0, express_1.default)();
(0, db_1.default)();
ExpressApp.use((0, cors_1.default)());
ExpressApp.use(express_1.default.json());
ExpressApp.use('/student', studentRoutes_1.default);
ExpressApp.use('/expert', expertRoutes_1.default);
ExpressApp.use('/admin', adminRoutes_1.default);
ExpressApp.get('/', (req, res) => {
    res.json({
        status: "ok"
    });
});
ExpressApp.listen(3002, () => {
    console.log("Server running at http://localhost:3002");
});
