import { Sequelize } from "sequelize"

const ConfigurePostgreSQL = () => {
    try {
        return new Sequelize(`postgres://${process.env.POSTGRES_DB_USERNAME}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_DB_HOST}:${process.env.POSTGRES_DB_PORT}/${process.env.POSTGRES_DB_DB ?? ""}`)
    } catch (ex) {
        console.log(`Error configuring PostgreSQL: \n ${ex}`)
        process.exit(1)
    }
}
export default ConfigurePostgreSQL