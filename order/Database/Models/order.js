const mongoose = require('mongoose');   //Kütüphaneyi dahil ettik

const Schema = mongoose.Schema;   

const OrderSchema = new Schema({       //Şema oluşturduk
    User: {
        UserId:{type:String},
        Username: {type:String},
        Userphone: {type:String}
    },
    Books: [ { 
        proid:{type:String},
        name:{type:String},
        price:{type:Number},
        quantity:{type:Number}
    }],
    address:
        {
            street: {type:String},
            postalCode:{type:String},
            city: {type:String},
            country: {type:String}
        },
    status:String,
    payment:Boolean,
    total:Number
});

module.exports =  mongoose.model('order', OrderSchema);       //şemayı export ettik. ilk kısım adı, ikinci kısım modeli oluşturan şema