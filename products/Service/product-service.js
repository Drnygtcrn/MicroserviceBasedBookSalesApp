const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");

class ProductService {

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs){
        try{
            const productResult = await this.repository.CreateProduct(productInputs);
            return FormateData({id: productResult._id });            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetProducts(){
        try{
            const products = await this.repository.Products();
    
            let categories = {};
    
            products.map(({ type }) => {
                categories[type] = type;
            });
            
            return FormateData({
                products,
                //categories:  Object.keys(categories) ,
            })

        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetProductsByCategory(category){
        try {
            const products = await this.repository.FindByCategory(category);
            return FormateData(products)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetProductsByName(name){
        try {
            const products = await this.repository.FindByName(name);
            return FormateData(products)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }
    async GetProductsByAuthor(author){
        try {
            const products = await this.repository.FindByAuthor(author);
            return FormateData(products)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetProductsByPublisher(publisher){
        try {
            const products = await this.repository.FindByPublisher(publisher);
            return FormateData(products)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }


    async GetProductDescription(productName){
        try {
            console.log("Product Ismi Servis",productName);
            const products = await this.repository.FindProduct(productName);
            return FormateData(products)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async Get(id){
        try {
            console.log("Product Ismi Servis",id);
            const products = await this.repository.Get(id);
            return FormateData(products)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async DeleteProduct(id){
        try {
            console.log("Product Ismi Servis",id);
            const products = await this.repository.DeleteProduct(id);
            return FormateData(products)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async UpdateProduct(productInputs){
        try{
            const productResult = await this.repository.UpdateProduct(productInputs);
            return FormateData({id: productResult._id });            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }





}
module.exports = ProductService;