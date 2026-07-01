import { Transaction } from "./transaction";

export abstract class IUnitOfWork {
    abstract execute<T>(work: (trx: Transaction) => Promise<T>): Promise<T>;
}