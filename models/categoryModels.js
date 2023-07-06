const mongoose = require('mongoose');
const cateschema =new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: '1'
    }
});
module.exports = mongoose.model('Category', cateschema);