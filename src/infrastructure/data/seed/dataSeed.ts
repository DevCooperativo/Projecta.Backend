import ProfessorEntity from "../entityMapping/professorEntity";
import Professor from "domain/models/professor";
import { sequelize } from "infrastructure/data/sequelize";
// import syncEntities from "../syncEntities";
import { Error as SequelizeError } from "sequelize";

class DataSeed {

    public static async run() {
        try {
            // await syncEntities()
            await DataSeed.SeedData()
        } catch (ex) {
            if (ex instanceof SequelizeError)
                console.log(ex.name)
        }
    }
    public static async SeedData() {
        if ((await ProfessorEntity.findAll()).length === 0) {
            const professor: Professor = new Professor("Teste", "email@mail.com", "123456")
            await ProfessorEntity.create({ ...professor }, { returning: true })
        }
    }
}
export default DataSeed