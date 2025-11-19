import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/router.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.static("./public/images"));
app.use(cookieParser());
app.use("/api/v1/",router)
app.get('/', (req, res) => {
  res.send('Welcome to E-M-S');
});

export default app;
