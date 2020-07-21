import { User } from './user';

export class Moderator {
    constructor(
        public name: string,
        public rank: string,
        public userList: User[]
    ) {}
}