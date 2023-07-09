const mongoose = require('mongoose');   //Kütüphaneyi dahil ettik

const Schema = mongoose.Schema;   

const WhislistSchema = new Schema({       //Şema oluşturduk
    CustomerId:{type:String},
    Products: [ { 
        proid:{type:String},
        name:{type:String},
        author:{type:String},
        publisher:{type:String},
        publication_year:{type:String},
        number_of_pages:{type:String},
        language:{type:String},
        price:{type:Number},
        type:{type:String},
        img:{type:String},
    }]
});

module.exports =  mongoose.model('whislist', WhislistSchema);       //şemayı export ettik. ilk kısım adı, ikinci kısım modeli oluşturan şema