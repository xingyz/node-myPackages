// app/models/kuaidi.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KuaidiSchema = new Schema({
    student_id:{type:Schema.Types.ObjectId, ref: 'Student'},
    student_name:String,
    tracking_number:{type:String, unique:true,index:true},
    service_provider:String,
    states:[{time:Date,location:String,context:String,ftime:Date}]
});

module.exports = mongoose.model('Kuaidi', KuaidiSchema);
