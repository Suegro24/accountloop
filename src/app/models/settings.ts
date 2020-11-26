export class Settings {
    constructor(
        public isBudgetNegativeValueAllowed: boolean,
        public darkMode: boolean,
        public notificationsSound: boolean,
        public allowReceivingTransfers: boolean,
        public notificationVolume: number
    ) {}
}
