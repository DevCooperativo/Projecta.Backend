import "reflect-metadata"
import dotenv from "dotenv";
import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./api/routes";
import ConfigurePostgreSQL from "./infrastructure/databases/PostgreSQLConfiguration";

dotenv.config();
const app = express();

export const sequelize = ConfigurePostgreSQL()

// export const mongoClient = connectDB();
// Middleware
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
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Request Body:', req.body);
    next();
});

// Usar as rotas
app.use(routes)
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
