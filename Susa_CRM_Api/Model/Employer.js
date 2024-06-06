const mongoose = require('mongoose');


let EmployerSchemas = mongoose.Schema({
    
    Mid:{
        type:String,
        required:false
    },
    email: {
        type : String,
        required : false 
    },
    password:{
        type : String,
        required : false
    },
    name:{
        type : String,
        required : false
    },
    
    notification :[],
    history :[],
    calls :[],
    noofcall:{
        type : Number,
        required : false
    },
    totalcall:{
        type : Number,
        required : false
    },
    followupcall:{
        type : Number,
        required : false
    },
    callnotdone:{
        type : Number,
        required : false
    },
    targetcall:{
        type : Number,
        required : false
    },

    present:{
        type : Boolean,
        required : false
    },
    attendance:  [],
    revenue: [],
    code :{
        type : String,
        required : false
    },
  
  
 
   
   


  
});

module.exports = EmployerSchemas = mongoose.model('employees',EmployerSchemas);