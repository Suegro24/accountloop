import { Category } from './category';

export class Income {
    constructor(
        public name: string,
        public money: number,
        public date: Date,
        public category: Category,
        public type: string,
        public status: string,
        public message: string,
        public senderId: string,
        public senderName: string,
        public expenseRef: string
    ) {}
}
