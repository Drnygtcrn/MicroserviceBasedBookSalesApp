const { WhislistModel} = require("../models");

class WhislistRepository {
    async CreateWhislist(CustomerId ) {
        try {
          
          
            const existingWhislist = await WhislistModel.findOne({ CustomerId: CustomerId });

            if (!existingWhislist) {
              const whislist = new WhislistModel({ CustomerId });
              const whislistResult = await whislist.save();
              return whislistResult._id;
            }
          
            
          
          return existingWhislist;
        } catch (err) {
          console.log("Error ==========");
          console.log(err);
          throw err; 
        }
  }

  async addToWhislist({CustomerId, Products}) {
    try {                                        
      const proid = Products[0]._id;
      const {name, author, publisher, publication_year, number_of_pages, language,  price, type, img } = Products[0];

      

      const existingWhislist = await WhislistModel.findOne({CustomerId: CustomerId});

      let productIndex = -1;
      for (let i = 0; i < existingWhislist.Products.length; i++) {
        if (existingWhislist.Products[i].proid === proid) {
          productIndex = i;
          break;
        }
      }
      if (productIndex !== -1) {
        
      } else {
        existingWhislist.Products.push({ proid, name, author, publisher, publication_year, number_of_pages, language, price, type, img });
        const addResult = await existingWhislist.save()
      }

      
      return existingWhislist;

    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }
  async deleteToWhislist({CustomerId, productId}) {
    try {  
      
      const existingWhislist = await WhislistModel.findOne({ CustomerId: CustomerId });

      console.log(existingWhislist);
      
      //const removedProduct = existingWhislist.Products.find(product => product.proid.toString() === productId);

      existingWhislist.Products = existingWhislist.Products.filter(product => product.proid.toString() !== productId);

  
      console.log("saaaaaaaaaaaaaaaaaaa",existingWhislist.Products);
      const updatedBasket = await existingWhislist.save();

      return existingWhislist;
    } catch (err) {
      console.log("Error ========= Isim bulunamadı ya da getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async GetWhislist(CustomerId ) {
    try {
      
      const existingBasket = await WhislistModel.findOne({ CustomerId: CustomerId });
      
      return existingBasket;
    } catch (err) {
      console.log("Error ==========");
      console.log(err);
      throw err; 
    }
}
  
  
}

module.exports = WhislistRepository;
