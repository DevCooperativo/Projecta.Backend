import { Sequelize } from "sequelize"

const ConfigurePostgreSQL = () => {
    try {
        const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_DB_USERNAME}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_DB_HOST}/${process.env.POSTGRES_DB_DB ?? ""}`)
        return sequelize
    } catch (ex) {
        console.log(ex)
        process.exit(1)
    }
}
export default ConfigurePostgreSQL