import { Category } from './category';

export class Expense {
    constructor(
        public name: string,
        public money: number,
        public date: Date,
        public category: Category,
        public type: string,
        public status: string,
        public recipientName: string
    ) {}
}
