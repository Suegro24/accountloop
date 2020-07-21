import { Address } from './address';
import { User } from './user';
import { FirmBudget } from './firmBudget';

export class Firm {
    constructor(
        public name: String,
        public address: Address,
        public users: User[],
        public firmBudget: FirmBudget,
        public isDeleted: Boolean
    ) {}
}