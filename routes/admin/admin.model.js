const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    order_id: {
        type: String
    },
    total: {
        type: Number
    },
    date_time: {
        type: Date
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
