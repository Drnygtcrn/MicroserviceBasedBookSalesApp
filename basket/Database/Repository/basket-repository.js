const { BasketModel} = require("../models");

class BasketRepository {
  async CreateBasket(CustomerId) {
        try {
          
          //const { proid, name, author, publisher, publication_year, number_of_pages, language,  price, type} = Products[0];
          
          const total = 0;
          console.log(CustomerId);
          const basket = new BasketModel({CustomerId, /*Products:[{ proid, name, author, publisher, publication_year, number_of_pages, language,  price, type}],*/ total});
          
          const basketResult = await basket.save();
          
          return basketResult._id;
        } catch (err) {
          console.log("Error ==========");
          console.log(err);
          throw err; 
        }
  }
  async GetBasket(CustomerId ) {
    try {
      
      const existingBasket = await BasketModel.findOne({ CustomerId: CustomerId });
      
      
      return existingBasket;
    } catch (err) {
      console.log("Error ==========");
      console.log(err);
      throw err; 
    }
}
  async addToBasket({CustomerId, Products}) {
    try {                                        
      const proid = Products[0]._id;
      const {name, author, publisher, publication_year, number_of_pages, language,  price, type, img } = Products[0];

      

      const existingBasket = await BasketModel.findOne({CustomerId: CustomerId});

      let productIndex = -1;
      for (let i = 0; i < existingBasket.Products.length; i++) {
        if (existingBasket.Products[i].proid === proid) {
          productIndex = i;
          break;
        }
      }
      if (productIndex !== -1) {
        existingBasket.Products[productIndex].quantity += 1;
      } else {
        const quantity = 1;
        existingBasket.Products.push({ proid, name, author, publisher, publication_year, number_of_pages, language, price, type, img, quantity });
      }

      existingBasket.total += price;

      
      const addResult = await existingBasket.save()
      
      return existingBasket;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async addToBasketfromWhislist({CustomerId, Products}) {
    try {                                        
      const proid = Products[0].proid;
      const {name, author, publisher, publication_year, number_of_pages, language,  price, type, img } = Products[0];

      

      const existingBasket = await BasketModel.findOne({CustomerId: CustomerId});

      let productIndex = -1;
      for (let i = 0; i < existingBasket.Products.length; i++) {
        if (existingBasket.Products[i].proid === proid) {
          productIndex = i;
          break;
        }
      }
      if (productIndex !== -1) {
        existingBasket.Products[productIndex].quantity += 1;
      } else {
        const quantity = 1;
        existingBasket.Products.push({ proid, name, author, publisher, publication_year, number_of_pages, language, price, type, img, quantity });
      }

      existingBasket.total += price;

      
      const addResult = await existingBasket.save()
      
      return existingBasket;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }



  async UpdateUp({CustomerId, ProductId}) {
    try {                                        
    
      const existingBasket = await BasketModel.findOne({CustomerId: CustomerId});
      
      for (let i = 0; i < existingBasket.Products.length; i++) {
        const product = existingBasket.Products[i];
        if (product.proid === ProductId) {
          existingBasket.total = parseFloat(existingBasket.total) + parseFloat(product.price);         
          product.quantity = (product.quantity + 1);
          break;
        }
      }
    
      
      const addResult = await existingBasket.save()

      return existingBasket;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }
  async UpdateDown({CustomerId, ProductId}) {
    try {                                        
    
      const existingBasket = await BasketModel.findOne({CustomerId: CustomerId});
      
      for (let i = 0; i < existingBasket.Products.length; i++) {
        const product = existingBasket.Products[i];
        if (product.proid === ProductId) {
          existingBasket.total = parseFloat(existingBasket.total) - parseFloat(product.price);        
          product.quantity = (product.quantity - 1);
          break;
        }
      }
    
      
      const addResult = await existingBasket.save()

      return existingBasket;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }
  async deleteToBasket({CustomerId, productId}) {
    try {  
      
      const existingBasket = await BasketModel.findOne({ CustomerId: CustomerId });

      console.log(existingBasket);
      /*
      existingBasket.Products = existingBasket.Products.filter(product => product.proid.toString() !== productId);
      existingBasket.total -= product.price * product.quantity;
      */

      const removedProduct = existingBasket.Products.find(product => product.proid.toString() === productId);

      existingBasket.Products = existingBasket.Products.filter(product => product.proid.toString() !== productId);

      console.log("-----------",removedProduct.price)
      console.log("-------------",removedProduct.quantity);
      if (removedProduct) {
        existingBasket.total = existingBasket.total - removedProduct.price * removedProduct.quantity;
      }
  
      console.log("saaaaaaaaaaaaaaaaaaa",existingBasket.Products);
      const updatedBasket = await existingBasket.save();

      return existingBasket;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async deleteAll(CustomerId) {
    try {  
      
      const existingBasket = await BasketModel.findOne({ CustomerId: CustomerId });

      existingBasket.Products = [];
      existingBasket.total = 0;

      const updatedBasket = await existingBasket.save();

      return existingBasket;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }



    
  
}

module.exports = BasketRepository;
