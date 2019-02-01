const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tableId: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
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
