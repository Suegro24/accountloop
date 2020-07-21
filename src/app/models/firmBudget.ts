import { Moderator } from './moderator';
import { Expense } from './expense';
import { Income } from './income';

export class FirmBudget {
    constructor(
        public money: number,
        public moderators: Moderator[],
        public expense: Expense[],
        public income: Income[]
    ) {}
}