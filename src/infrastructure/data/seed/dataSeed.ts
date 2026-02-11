import ProfessorEntity from "../entityMapping/professorEntity";
import Professor from "domain/models/professor";
import { sequelize } from "infrastructure/data/sequelize";
import syncEntities from "../syncEntities";

class DataSeed {

    public static async run() {
        await syncEntities()
        await DataSeed.SeedData()
    }
    public static async SeedData() {
        console.log("asdiadsa")
        if ((await ProfessorEntity.findAll()).length === 0) {
            const professor: Professor = new Professor("Teste", "email@mail.com", "123456")
            await ProfessorEntity.create({ ...professor }, { returning: true })
        }
    }
}
export default DataSeed