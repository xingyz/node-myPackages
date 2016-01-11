// app/models/student.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    name: {type:String, required:true},
    active: {type:Boolean, required:true, default: true},
    package_info:[{type:Schema.Types.ObjectId, ref: 'Kuaidi'}]

});

module.exports = mongoose.model('Student', StudentSchema);
