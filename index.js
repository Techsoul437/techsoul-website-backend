import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import adminRoute from "./routes/adminRoute.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL || 'mongodb://localhost:27017/TechsoulSolutions';

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Test route
app.get('/', (req, res) => {
    res.send("TechSoul's backend is up and running!");
});

// Admin Routes
app.use("/admin", adminRoute);

// MongoDB Connection
mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log('✅ Database Connected Successfully');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Database Connection Error:', err);
        process.exit(1);
    });


export default app;