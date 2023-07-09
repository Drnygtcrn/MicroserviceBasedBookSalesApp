const { DegerlendirmeRepository } = require("../database");
const { FormateData } = require("../utils");

class DegerlendirmeService {

    constructor(){
        this.repository = new DegerlendirmeRepository();
    }

    async CreateReview( ReviewInputs){
        try{
            console.log(ReviewInputs);
            const reviewResult = await this.repository.CreateReview(ReviewInputs);
            console.log(reviewResult);
            return FormateData({id: reviewResult._id });            
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetReviewsByProduct(ProductID){
        try {
            const reviews = await this.repository.FindByProducts(ProductID);
            return FormateData(reviews)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async DeleteComment(commentId){
        try {
            const reviews = await this.repository.DeleteComment(commentId);
            return FormateData(reviews)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async UpdateComment(ReviewInputs){
        try {
            const reviews = await this.repository.UpdateComment(ReviewInputs);
            return FormateData(reviews)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetReviewsByCustomer(CustomerID){
        try {
            const reviews = await this.repository.FindByCustomers(CustomerID);
            return FormateData(reviews)
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    





}
module.exports = DegerlendirmeService;