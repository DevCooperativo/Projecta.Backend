import { Transaction as SequelizeTransaction } from "sequelize";
import { Transaction } from "@/application/unitOfWork/transaction";

export class SequelizeTransactionAdapter implements Transaction {
  constructor(public readonly trx: SequelizeTransaction) {}
}