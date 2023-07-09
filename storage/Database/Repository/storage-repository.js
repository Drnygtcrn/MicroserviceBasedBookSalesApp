const { StorageModel} = require("../models");

class StorageRepository {
  async CreateStorage({ Book,quantity}) {
    try {
      const storage = new StorageModel({Book,quantity});
      const storageResult = await storage.save();
      return storageResult;
    } catch (err) {
      console.log("Error ==========");
      console.log(err);
      throw err; 
    }
  }

  async DecreaseStorage({ProductID, quantity}) {
    try {
      const storage = await StorageModel.findOne({ 'Book.proid' : ProductID });
      
      if (!storage) {
        throw new Error('Storage not found');
      }
      
      if (storage.quantity < quantity) {
        throw new Error('Insufficient quantity in storage');
      }
      
      storage.quantity -= quantity;
      const storageResult = await storage.save();
      
      return storageResult;
    } catch (err) {
      console.log('Error ==========');
      console.log(err);
      throw err;
    }
  }

  async IncreaseStorage({ProductID, quantity}) {
    try {
      const storage = await StorageModel.findOne({ 'Book.proid' : ProductID });
      
      if (!storage) {
        throw new Error('Storage not found');
      }
      
      storage.quantity += quantity;
      const storageResult = await storage.save();
      
      return storageResult;
    } catch (err) {
      console.log('Error ==========');
      console.log(err);
      throw err;
    }
  }
  

  async storages() {
    try {
      return await StorageModel.find();
    } catch (err) {
      console.log("Error ========= Stoklar Getirelemedi");
      console.log(err);
      throw err; 
    }
  }
  
  async FindByProducts(proid) {
    try {                                        //findOne tek nesne getirir. Örneğin ID için bunu kullan
      const existingStorages = await StorageModel.findOne({ 'Book.proid' : proid });
      return existingStorages; 
    } catch (err) {
      console.log("Error ========= review getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async DeleteBook(proid) {
    try {                                       
      const existingStorages = await StorageModel.deleteOne({ 'Book.proid' : proid });
      return existingStorages; 
    } catch (err) {
      console.log("Error ========= review getirilemedi");
      console.log(err);
      throw err; 
    }
  }

  async ControlBook(proid) {
    try {                       
      console.log(proid);            
      const existingStorage = await StorageModel.findOne({ 'Book.proid': proid });
      console.log(existingStorage);
      return existingStorage; 
    } catch (err) {
      console.log("Error ========= review getirilemedi");
      console.log(err);
      throw err; 
    }
  }
  async DecreaseStorage({proid, quantity}) {
    try {
      const storage = await StorageModel.findOne({ 'Book.proid' : proid });
      
      if (!storage) {
        throw new Error('Storage not found');
      }
      
      if (storage.quantity < quantity) {
        throw new Error('Insufficient quantity in storage');
      }
      
      storage.quantity -= quantity;
      const storageResult = await storage.save();
      
      return storageResult;
    } catch (err) {
      console.log('Error ==========');
      console.log(err);
      throw err;
    }
  }

  

  

  
  
}

module.exports = StorageRepository;
