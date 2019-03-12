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
    /**
     * Get a user by there id.
     * @param {*} id Users id.
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then(user => {
                if (user) {
                    return user;
                }
                
                return Promise.reject(new Error('No user item found'));
            });
    },

    /**
     * Get a paged list of use
     * @param {*} param0 query data.
     */
    list({ skip = 0, limit = 50, query = null } = {}) {
        return this.find({})
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

module.exports = mongoose.model('User', UserSchema);
