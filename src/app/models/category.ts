import { Match } from './match';

export class Category {
    constructor(
        public name: string,
        public icon: string,
        public matches: Match[]
    ) {}
}
