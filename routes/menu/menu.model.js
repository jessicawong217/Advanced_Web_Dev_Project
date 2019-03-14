const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    id: {
        type: Number,
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

        if (query !== null) {
            var int = parseInt(query);

            searchData.$or = [{ name: { $regex: query, $options: 'i' } }];

            if (int != NaN) {
                // Need to add a where query in order to query partial numbers.
                searchData.$or.push({
                    $where: `function() { return this.id.toString().match(/${int}/) != null; }`
                });
            }
        }

        return this.find(searchData)
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

module.exports = mongoose.model('Menu', MenuSchema);
