export class Expense {
    constructor(
        public name: string,
        public money: number,
        public date: Date,
        public typeName: string,
        public type: string,
        public status: string
    ) {}
}