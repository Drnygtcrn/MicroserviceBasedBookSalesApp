const { OrderRepository } = require("../database");
const { FormateData } = require("../utils");

class OrderService {

    constructor(){
        this.repository = new OrderRepository();
    }

    async CreateOrder(productInputs){
        try{
            const productResult = await this.repository.CreateOrder(productInputs);
            return FormateData({OrderId:productResult._id});            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }
    async GetOrder(productInputs){
        try{
            const productResult = await this.repository.GetOrder(productInputs);
            return FormateData({Siparis: productResult});            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async DeleteOrder(productInputs){
        try{
            const productResult = await this.repository.DeleteOrder(productInputs);
            return FormateData({Bilgi: productResult});            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async UpdateOrder(productInputs){
        try{
            const productResult = await this.repository.UpdateOrder(productInputs);
            return FormateData({Status: productResult});            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async getInvoice(productInputs){
        try{
            const productResult = await this.repository.getInvoice(productInputs);
            return FormateData({Username: productResult.Username, Books: productResult.kitaplar, Adres: productResult.adres, Total: productResult.total});            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }





}
module.exports = OrderService;