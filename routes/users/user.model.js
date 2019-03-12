const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Waiter', 'Manager', 'Admin'],
        required: true
    },
    pin: {
        type: String,
        required: true
    }
});

// Methods to be used on each user object.
UserSchema.method({});

// Static methods to be called against User.
UserSchema.statics = {
    // Wrapper on find method will be used to return clearer errors.
    get(id) {
        return this.findById(id)
            .exec()
            .then(user => {
                if (user) {
                    return user;
                }
                // TODO: return error status code within error.
                return Promise.reject(new Error('No user item found'));
            });
    },

    getByPin(pin) {
        return this.findOne({ pin: pin })
            .exec()
            .then(user => {
                if (user) {
                    return user;
                }

                return Promise.reject(new Error('No user item found'));
            });
    },

    list({ skip = 0, limit = 50, query = null } = {}) {
        var searchData = {};

        if (query !== null) {
            searchData.$or = [
                { 'name': { "$regex": query, "$options": "i" } },
                // TODO add searching by id.
                // { 'itemId': { "$regex": query, "$options": "i" }}
            ]
        }

        return this.find(searchData)
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

module.exports = mongoose.model('User', UserSchema);
