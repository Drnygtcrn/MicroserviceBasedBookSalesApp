const { BasketRepository } = require("../database");
const { FormateData } = require("../utils");

class BasketService {

    constructor(){
        this.repository = new BasketRepository();
    }

    async CreateBasket(productInputs){
        try{
            const basketResult = await this.repository.CreateBasket(productInputs);
            return FormateData({id: basketResult._id });  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetBasket(productInputs){
        try{
            const basketResult = await this.repository.GetBasket(productInputs);
            return FormateData({basketResult});  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async AddItem(productInputs){
        try{
            const basketResult = await this.repository.addToBasket(productInputs);
            return FormateData({id: basketResult._id, Products: basketResult.Products, total: basketResult.total });  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async AddItemWhislist(productInputs){
        try{
            const basketResult = await this.repository.addToBasketfromWhislist(productInputs);
            return FormateData({id: basketResult._id, Products: basketResult.Products, total: basketResult.total });  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async UpdateUp(productInputs){
        try{
            const basketResult = await this.repository.UpdateUp(productInputs);
            return FormateData({id: basketResult._id });  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }
    async UpdateDown(productInputs){
        try{
            const basketResult = await this.repository.UpdateDown(productInputs);
            return FormateData({id: basketResult._id });  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }



    async DeleteItem(productInputs){
        try{
            const basketResult = await this.repository.deleteToBasket(productInputs);
            return FormateData({basketResult:basketResult });  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async deleteAll(productInputs){
        try{
            const basketResult = await this.repository.deleteAll(productInputs);
            return FormateData({basketResult:basketResult });  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }



}
module.exports = BasketService;