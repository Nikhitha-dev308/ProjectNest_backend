import express from 'express';
import cors from 'cors';

import studentRoutes from './routes/studentRoutes';
import expertRoutes from './routes/expertRoutes';
import adminRoutes from './routes/adminRoutes';
import connectDatabase from './config/db';

const ExpressApp: any = express();

connectDatabase();

ExpressApp.use(cors());
ExpressApp.use(express.json());
ExpressApp.use('/student', studentRoutes);
ExpressApp.use('/expert', expertRoutes);
ExpressApp.use('/admin', adminRoutes);

ExpressApp.get('/', (req: any, res: any) => {
    res.json({
        status: "ok"
    })
});


ExpressApp.listen(3002, () => {
    console.log("Server running at http://localhost:3002");
});