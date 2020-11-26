import { Position } from './position';
import { Budget } from './budget';
import { Settings } from './settings';
import { BudgetGoals } from './budgetGoals';

export class User {
    constructor(
        public name: string,
        public surname: string,
        public password: string,
        public email: string,
        public phone: string,
        public description: string,
        public photo: string,
        public dateOfBirth: Date,
        public sex: string,
        public budget: Budget,
        public position: Position,
        public firmId: string,
        public firmStatus: number,
        public firmBudget: Budget,
        public disabledUser: [],
        public awaitingPaymentsToAccept: number,
        public admin: boolean,
        public settings: Settings,
        public isUserBlocked: boolean,
        public budgetGoals: BudgetGoals[],
        public isOnline: boolean
    ) {}
}
