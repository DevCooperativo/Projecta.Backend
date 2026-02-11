import { sequelize } from "infrastructure/data/sequelize";
import DataSeed from "./dataSeed";

async function run() {
    await sequelize.authenticate()
    await DataSeed.SeedData()

    // await sequelize.close()
    process.exit(0)
}

// run().catch(err => {
//     console.error("Seed failed", err);
//     process.exit(1)
// });