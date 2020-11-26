export class Mail {
    constructor(
        public senderId: string,
        public recipientId: string,
        public senderName: string,
        public topic: string,
        public message: string,
        public status: string,
        public type: string
    ) {}
}