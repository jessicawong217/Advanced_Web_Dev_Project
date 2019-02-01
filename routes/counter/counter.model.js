const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
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

// Methods to be used on each counter object.
CounterSchema.method({});

// Static methods to be called against Counter.
CounterSchema.statics = {
    // Wrapper on find method will be used to return clearer errors.
    get(id) {
        return this.findById(id)
            .exec()
            .then(counter => {
                if (counter) {
                    return counter;
                }
                // TODO: return error status code within error.
                return Promise.reject(new Error('No counter item found'));
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

module.exports = mongoose.model('Counter', CounterSchema);
