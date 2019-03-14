const mongoose = require('mongoose');

var OrderItemsSchema = new mongoose.Schema({
    menuItemId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    finishedAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ['InProgress', 'Completed'],
        default: 'InProgress'
    }
});

const OrderSchema = new mongoose.Schema({
    tableId: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['InProgress', 'Completed'],
        required: true
    },
    total: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    finishedAt: {
        type: Date
    },
    items: [
        OrderItemsSchema
    ]
});

// Define order object methods, abstracts away modification of a given order.
OrderSchema.method({
    /**
     * Mark the current order as completed.
     */
    complete(dicountedValue, total) {
        this.status = 'Completed';
        this.discount = dicountedValue;
        this.total = total;
        this.finishedAt = Date.now();
    },

    /**
     * Complete an item on the order by its id.
     * @param {*} id Id of the order item being completed.
     */
    completeItem(id) {
        var item = this.items.id(id);

        if (item == null || item.status == 'Completed') {
            throw new Error(`No InProgress order item found with id of ${id}`);
        }

        item.status = 'Completed';
        item.finishedAt = new Date().toISOString();
    },

    /**
     * Complete all items on an order.
     */
    completeAllItems() {
        this.items.forEach(item => {
            item.status = 'Completed';
            item.finishedAt = Date.now;
        });
    }
});

OrderSchema.statics = {
    // Wrapper on find method will be used to return clearer errors.
    getById(id) {
        return this.findById(id)
            .exec()
            .then(order => {
                if (order) {
                    return order;
                }
                // TODO: return error status code within error.
                return Promise.reject(new Error('No order found'));
            });
    },

    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    },

    getByStatus(orderStatus) {
        return this.find({ status: orderStatus })
            .sort({ createdAt: -1 })
            .exec();
    },

    getByDates(from, to) {
        return this.find({
            finishedAt: {
                $gte: from,
                $lt: to
            },
            status: "Completed"
        })
            .exec();
    },

    addItems(id, items) {
        return this.findOneAndUpdate(
            { "_id": id },
            { $push: { items: { $each: items } } },
            { new: true }
        )
            .exec()
            .then(order => {
                if (order) {
                    return order;
                }
                // TODO: return error status code within error.
                return Promise.reject(new Error('No order found'));

            });
    }
};

module.exports = mongoose.model('Order', OrderSchema);
