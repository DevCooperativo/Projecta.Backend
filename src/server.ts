import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata"
import "api/dependencyInjection/tsyringe/index"
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./api/routes";
import DataSeed from "infrastructure/data/seed/dataSeed";
import cookieParser from "cookie-parser"
const app = express();
DataSeed.run()

// export const mongoClient = connectDB();
// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(helmet());

// Limite de requisições para evitar brute force
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 requisições por janela
    message: "Muitas requisições. Tente novamente mais tarde.",
});
app.use(limiter); // ⬅️ Aqui, antes das rotas

// Conectar ao banco de dados

// Middleware de depuração (opcional, apenas durante desenvolvimento)

// Usar as rotas
app.use("/api", routes)
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
