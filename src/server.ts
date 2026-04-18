import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata"
import "api/dependencyInjection/tsyringe/index"
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./api/routes";
import errorHandler from "api/middlewares/errorHandler";
import DataSeed from "infrastructure/data/seed/dataSeed";
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "api/docs/swagger.json"
const app = express();
DataSeed.run()

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Muitas requisições. Tente novamente mais tarde.",
});
app.use(limiter);

app.use("/api", routes)
app.use(errorHandler)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
