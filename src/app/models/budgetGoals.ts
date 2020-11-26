export class BudgetGoals {
    constructor(
        public name: string,
        public goal: number,
        public currentState: number,
        public isCompleted: boolean,
        public progress: number
    ) {}
}
