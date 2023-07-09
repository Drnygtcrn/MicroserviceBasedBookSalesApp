const { WhislistRepository } = require("../database");
const { FormateData } = require("../utils");

class WhislistService {

    constructor(){
        this.repository = new WhislistRepository();
    }

    async CreateWhislist(productInputs){
        try{
            const basketResult = await this.repository.CreateWhislist(productInputs);
            return FormateData({id: basketResult._id });  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async AddItem(productInputs){
        try{
            const whislistResult = await this.repository.addToWhislist(productInputs);
            return FormateData({id: whislistResult._id, Products: whislistResult.Products});  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async DeleteItem(productInputs){
        try{
            const whislistResult = await this.repository.deleteToWhislist(productInputs);
            return FormateData({whislistResult:whislistResult });  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async GetWhislist(productInputs){
        try{
            const basketResult = await this.repository.GetWhislist(productInputs);
            return FormateData({basketResult});  
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }


}
module.exports = WhislistService;