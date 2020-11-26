const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    isBudgetNegativeValueAllowed: Boolean,
    darkMode: Boolean,
    notificationsSound: Boolean,
    allowReceivingTransfers: Boolean,
    notificationVolume: Number
})

const Settings = mongoose.model('settings', SettingsSchema);

module.exports = Settings;