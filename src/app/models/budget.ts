import { Expense } from './expense';
import { Income } from './income';

export class Budget {
    constructor(
        public money: number,
        public expense: Expense[],
        public income: Income[]
    ) {}
}
