const mongoose = require('mongoose');
const categoryschema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: '1'
    }
});
module.exports = mongoose.model('subcategory', categoryschema);