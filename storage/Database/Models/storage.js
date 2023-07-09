const mongoose = require('mongoose');   //Kütüphaneyi dahil ettik

const Schema = mongoose.Schema;   

const StorageSchema = new Schema({   
    Book:{ 
        proid:{type:String},
        name:{type:String},
        author:{type:String},
        publisher:{type:String},
        publication_year:{type:String},
        number_of_pages:{type:String},
        language:{type:String},
        price:{type:String},
        type:{type:String},
        img:{type:String}
    },
    quantity: Number 
});

module.exports =  mongoose.model('storage', StorageSchema);       //şemayı export ettik. ilk kısım adı, ikinci kısım modeli oluşturan şema