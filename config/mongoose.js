const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1/passportData');
if(db){
    console.log("DB is connect");
}
else{
    console.log("DB is not connect");
}
module.exports = db