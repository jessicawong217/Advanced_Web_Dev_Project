const mongoose = require('mongoose');

const WaiterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
});

// Methods to be used on each waiter object.
WaiterSchema.method({});

// Static methods to be called against waiter.
WaiterSchema.statics = {
    // Wrapper on find method uwill be used to return clearer errors.
    get(id) {
        return this.findById(id)
            .exec()
            .then(waiter => {
                if (waiter) {
                    return waiter;
                }
                // TODO: return error status code within error.
                return Promise.reject(new Error('No waiter item found'));
            });
    },

    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

module.exports = mongoose.model('waiter', WaiterSchema);
