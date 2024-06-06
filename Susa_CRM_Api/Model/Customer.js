const mongoose = require('mongoose');


let CustomerSchemas = mongoose.Schema({
    
    Tag:{
        type : String,
        required : false
    },
    Name:{
        type:String,
        required:false
    },
    Company:{
        type:String,
        required:false
    },
    WEmail:{
        type:String,
        required:false
    },
    Tittle:{
        type:String,
        required:false
    },
    CType:{
        type:String,
        required:false
    },
    WPhone:{
        type:String,
        required:false
    },
    WPhone2:{
        type:String,
        required:false
    },
    WPhone3:{
        type:String,
        required:false
    },
    WWeb:{
        type:String,
        required:false
    },
    Address:{
        type:String,
        required:false
    },
    City:{
        type:String,
        required:false
    },
    Zip:{
        type:String,
        required:false
    },
    Linkedin:{
        type:String,
        required:false
    },
    feedbacks:[],
    eid :  {
        type:String,
        required:false
    },
    mid :  {
        type:String,
        required:false
    },
    Stage:{
        type:String,
        required:false
    },
    Value:{
        type:Number,
        required:false,
        default: 0

    },
    CDate:{
        type:String,
        required:false
    },
    LossReason:{
        type:String,
        required:false
    },
    Priority:{
        type:String,
        required:false
    },
    Source:{
        type:String,
        required:false
    },
    Win:{
        type:String,
        required:false
    },
    Status:{
        type:String,
        required:false
    },
    FDate:{
        type:String,
        required:false
    },
    Ftime:{
        type:String,
        required:false
    },
    VDate:{
        type:String,
        required:false
    },
});

module.exports = CustomerSchemas = mongoose.model('customers',CustomerSchemas);