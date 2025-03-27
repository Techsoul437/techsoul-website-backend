import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import adminRoute from "./routes/adminRoute.js";
import blogRoute from "./routes/blogRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import faqRoute from "./routes/faqRoute.js";
import faqDepartmentRoute from "./routes/faqDepartmentRoute.js";
import inquiryRoute from "./routes/inquiryRoute.js";
import jobsRoute from "./routes/jobsRoute.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL || 'mongodb://localhost:27017/TechsoulSolutions';

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("TechSoul's backend is up and running!");
});

app.use("/admin", adminRoute);
app.use("/blog", blogRoute)
app.use("/review", reviewRoute)
app.use("/faq", faqRoute)
app.use("/faqDepartment", faqDepartmentRoute)
app.use("/inquiry", inquiryRoute)
app.use("/job", jobsRoute)

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