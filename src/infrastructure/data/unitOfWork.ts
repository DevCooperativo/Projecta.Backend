import { IUnitOfWork } from "@/application/unitOfWork/iUnitOfWork";
import { sequelize } from "./sequelize";
import { SequelizeTransactionAdapter } from "./transactionAdapter";
import { Transaction } from "@/application/unitOfWork/transaction";
import { injectable } from "tsyringe";

@injectable()
export class SequelizeUnitOfWork implements IUnitOfWork {
    constructor() { }
    async execute<T>(work: (trx: Transaction) => Promise<T>): Promise<T> {
        return sequelize.transaction(async (sequelizeTrx) => {
            const trx = new SequelizeTransactionAdapter(sequelizeTrx);
            return work(trx);
        });
    }
}