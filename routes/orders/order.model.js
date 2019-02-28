const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tableId: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['InProgress', 'Complete']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  orderItems: [
    {
      menuItemId: {
        type: String
      },
      name: {
        type: String
      },
      pricePerPortion: {
        type: Number
      },
      quantity: {
        type: Number
      }
    }
  ]
});

OrderSchema.method({});

OrderSchema.statics = {
  // Wrapper on find method uwill be used to return clearer errors.
  get(id) {
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
  }
};

module.exports = mongoose.model('Order', OrderSchema);
