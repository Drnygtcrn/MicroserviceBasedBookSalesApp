const { ProductModel} = require("../models");

class ProductRepository {
  async CreateProduct({ name, author, publisher, publication_year, number_of_pages, language, price, type, img }) {
    try {
      const product = new ProductModel({name, author, publisher, publication_year, number_of_pages, language, price, type, img});
      const productResult = await product.save();
      return productResult;
    } catch (err) {
      console.log("Error ==========");
      console.log(err);
      throw err; 
    }
  }

  async Products() {
    try {
      return await ProductModel.find();
    } catch (err) {
      console.log("Error ========= Productlar Getirelemedi");
      console.log(err);
      throw err; 
    }
  }
  
  async FindProduct(name) {
    try {                                        //findOne tek nesne getirir. Örneğin ID için bunu kullan
      console.log("repo",name);
      const existingProducts = await ProductModel.find({ name: name });
      return existingProducts;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async Get(id) {
    try {                                        //findOne tek nesne getirir. Örneğin ID için bunu kullan
      console.log("repo",id);
      const existingProducts = await ProductModel.findOne({ _id: id });
      return existingProducts;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }
  async FindByCategory(category) {
    try {
      const products = await ProductModel.find({ type: category });
      return products;
    } catch (err) {
      console.log("Error ========= Kategori bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async FindByName(name) {
    try {
      const products = await ProductModel.find({ name: name});
      return products;
    } catch (err) {
      console.log("Error ========= Kategori bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async FindByAuthor(author) {
    try {
      const products = await ProductModel.find({ author: author});
      return products;
    } catch (err) {
      console.log("Error ========= Kategori bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async FindByPublisher(publisher) {
    try {
      const products = await ProductModel.find({ publisher: publisher});
      return products;
    } catch (err) {
      console.log("Error ========= Kategori bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async DeleteProduct(id) {
    try {                                        //findOne tek nesne getirir. Örneğin ID için bunu kullan
      console.log("repo",id);
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
    return deletedProduct;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async UpdateProduct({id, name, author, publisher, publication_year, number_of_pages, language, price, type, img }) {
    try {
      const existingProducts = await ProductModel.findOne({ _id: id });
      
      if(name != null){
        existingProducts.name = name;
      }
      if(author != null){
        existingProducts.author = author;
      }
      if(publisher != null){
        existingProducts.publisher = publisher;
      }
      if(publication_year != null){
        existingProducts.publication_year = publication_year;
      }
      if(number_of_pages != null){
        existingProducts.number_of_pages = number_of_pages
      }
      if(language != null){
        existingProducts.language = language;
      }
      if(price != null){
        existingProducts.price = price;
      }
      if(type != null){
        existingProducts.type = type;
      }
      if(img != null){
        existingProducts.img = img;
      }

      const productResult = await existingProducts.save();
      return productResult;
    } catch (err) {
      console.log("Error ==========");
      console.log(err);
      throw err; 
    }
  }

  
  
}

module.exports = ProductRepository;
