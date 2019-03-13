const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    name: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Starter', 'Main', 'Side', 'Dessert', 'Drink']
    }
});

// Methods to be used on each menu object.
MenuSchema.method({});

// Static methods to be called against Menu.
MenuSchema.statics = {
    // Wrapper on find method will be used to return clearer errors.
    get(id) {
        return this.findById(id)
            .exec()
            .then(menu => {
                if (menu) {
                    return menu;
                }
                // TODO: return error status code within error.
                return Promise.reject(new Error('No menu item found'));
            });
    },

    list({ skip = 0, limit = 50, query = null } = {}) {
        var searchData = {};

        if (query !== null)  {
            searchData.$or = [
                { 'name': { "$regex": query, "$options": "i" }  },
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

module.exports = mongoose.model('Menu', MenuSchema);
