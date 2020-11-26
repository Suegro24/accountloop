import { Address } from './address';
import { User } from './user';
import { FirmBudget } from './firmBudget';
import { ChatMessageDto } from './chatMessageDto';

export class Firm {
    constructor(
        public name: string,
        public address: Address,
        public users: User[],
        public firmBudget: FirmBudget,
        public isDeleted: boolean,
        public chatMessages: ChatMessageDto[]
    ) {}
}
