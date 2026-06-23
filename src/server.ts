import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata"
import "@/api/dependencyInjection/tsyringe/index"
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./api/routes";
import DataSeed from "@/infrastructure/data/seed/dataSeed";
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "@/api/docs/swagger.json"
const app = express();
DataSeed.run()

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGINS?.split(",") ?? "*",
    credentials: true,
    allowedHeaders: ["Content-Type"]
}));
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 100,
    max: 100,
    message: "Muitas requisições. Tente novamente mais tarde.",
});
app.use(limiter);

app.use("/api", routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
