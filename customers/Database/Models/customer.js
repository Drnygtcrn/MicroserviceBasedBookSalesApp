const mongoose = require('mongoose');   //Kütüphaneyi dahil ettik

const Schema = mongoose.Schema;   

const CustomerSchema = new Schema({       //Şema oluşturduk
    name: String,
    email: String,
    password: String,
    phone: String,
    age: String,
    /*address:[
        { type: Schema.Types.ObjectId, ref: 'address', require: true }
    ],*/
    address:[
        {
            street: {type:String},
            postalCode:{type:String},
            city: {type:String},
            country: {type:String},
            check:{type:Boolean}
        }
    ],
    whislist:[
        {
            proid:{type:String},
            name:{type:String},
            author:{type:String},
            publisher:{type:String},
            publication_year:{type:String},
            number_of_pages:{type:String},
            language:{type:String},
            price:{type:String},
            type:{type:String}
        }
    ]
});

module.exports =  mongoose.model('customer', CustomerSchema);       //şemayı export ettik. ilk kısım adı, ikinci kısım modeli oluşturan şema