const { StorageRepository } = require("../database");
const { FormateData } = require("../Utils");

class StorageService {

    constructor(){
        this.repository = new StorageRepository();
    }

    async CreateStorage( StorageInputs){
        try{
            const StorageResult = await this.repository.CreateStorage(StorageInputs);
            return FormateData({id: StorageResult._id });            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }
    async DecraseStorage( StorageInputs){
        try{
            const StorageResult = await this.repository.DecreaseStorage(StorageInputs);
            return FormateData({id: StorageResult._id });            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async IncreaseStorage( StorageInputs){
        try{
            const StorageResult = await this.repository.IncreaseStorage(StorageInputs);
            return FormateData({id: StorageResult._id });            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetStorages(){
        try{
            const storages = await this.repository.storages();
    
            let categories = {};
    
            storages.map(({ type }) => {
                categories[type] = type;
            });
            
            return FormateData({
                storages,
                
            })

        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetStoragesByProduct(ProductID){
        try {
            const storages = await this.repository.FindByProducts(ProductID);
            return FormateData(storages);
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async DeleteBook(ProductID){
        try {
            const storages = await this.repository.DeleteBook(ProductID);
            return FormateData(storages);
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async ControlBook(books){
        try {
            for (let book of books) {
                const proid  = book.proid;
                const existingStorage = await this.repository.ControlBook(proid);
                console.log("AAAAAAAAAAAAa",existingStorage);
                if (!existingStorage || existingStorage.quantity < book.quantity){
                  return false;
                }
              }
              
              return true; 
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async DecreaseBook(books){
        try {
            for (let book of books) {
                const proid  = book.proid;
                const quantity = book.quantity;
                const existingStorage = await this.repository.DecreaseStorage({proid,quantity});
                console.log("AAAAAAAAAAAAa",existingStorage);
                if (!existingStorage || existingStorage.quantity < book.quantity){
                  return false;
                }
              }
              
              return true; 
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }
    


}
module.exports = StorageService;