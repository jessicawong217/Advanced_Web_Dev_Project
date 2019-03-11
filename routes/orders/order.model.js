const mongoose = require('mongoose');

var OrderItemsSchema = new mongoose.Schema({
    menuItemId: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    finishedAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ['InProgress', 'Completed']
    }
});

const OrderSchema = new mongoose.Schema({
    tableId: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['InProgress', 'Completed']
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
    complete() {
        this.finishedAt = Date.now;
        this.status = 'Completed';
    },

    /**
     * Complete an item on the order by its id.
     * @param {*} id Id of the order item being completed.
     */
    completeItem(id) {
        var item = this.items.id(id);

        if (item == null || item.status == 'Completed') {
            throw new Error('No InProgress order item found');
        }

        item.status = 'Completed';
        item.finishedAt = Date.now;
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
        return this.find({status : orderStatus})
            .sort({createdAt: -1})
            .exec();
    }
};

module.exports = mongoose.model('Order', OrderSchema);
