const mongoose = require('mongoose');   //Kütüphaneyi dahil ettik

const Schema = mongoose.Schema;   

const ProductSchema = new Schema({       //Şema oluşturduk
    name: String,
    author: String,
    publisher: String,
    publication_year: String,
    number_of_pages:String,
    language:String,
    price:Number,
    type:String,
    img:String
});

module.exports =  mongoose.model('product', ProductSchema);       //şemayı export ettik. ilk kısım adı, ikinci kısım modeli oluşturan şema