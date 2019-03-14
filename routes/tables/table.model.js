const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        dropDups: true
    },
    capacity: {
        type: Number,
        required: true
    }
});

// Methods to be used on each user object.
TableSchema.method({
});

// Static methods to be called against User.
TableSchema.statics = {
    /**
     * Get a paged list of tables.
     * @param {*} param0 query data.
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find({})
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

module.exports = mongoose.model('Table', TableSchema);
