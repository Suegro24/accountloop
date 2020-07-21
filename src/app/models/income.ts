export class Income {
    constructor(
        public name: string,
        public money: number,
        public date: Date,
        public typeName: string,
        public type: string,
        public status: string,
        public message: string,
        public senderId: string
    ) {}
}