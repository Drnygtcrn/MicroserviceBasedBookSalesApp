const { CustomerRepository } = require("../database");
const { FormateData, ValidatePassword } = require("../utils");

class CustomerService {

    constructor(){
        this.repository = new CustomerRepository();
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        console.log("Servis Mail",email);
        console.log("Servis Password",password);
        try {
            
            const existingCustomer = await this.repository.FindCustomer({email});
            console.log("Kullanıcı Mail",existingCustomer.email);
            console.log("Kullanıcı Password",existingCustomer.password);
            if(existingCustomer){
            
                const validPassword = await ValidatePassword(password, existingCustomer.password);
                console.log("Şifre",validPassword);
                if(validPassword){
                    return FormateData({existingCustomer});
                }
            }
    
            return FormateData(null);

        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }

       
    }

    async SignUp(userInputs){
        
        const {name, email, password, phone, age } = userInputs;
        console.log("Name",name);
        console.log("Mail",email);
        console.log("Password",password);
        console.log("Phone",phone);
        console.log("Age",age);
        console.log("----------")
        try{
            
            const customerResult = await this.repository.CreateCustomer({name, email, password, phone, age});
            console.log(customerResult._id);
            return FormateData({id: customerResult._id });

        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }

    }



    async GetAddress(userInputs){
        
        try {
            console.log(userInputs);
            const addressResult = await this.repository.GetAddress(userInputs);
            return FormateData({addressResult});
            
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
        
    
    }



    async AddNewAddress(userInputs){
        
        const { _id, street, postalCode, city,country} = userInputs;
        
        try {
            console.log(_id);
            console.log(street);
            const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city,country})
            return FormateData(addressResult);
            
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }       
    
    }

    async GetProfile(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById(id);
            return FormateData(existingCustomer);
            
        } catch (err) {
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }


    async AddItem(productInputs){
        try{
            const basketResult = await this.repository.addToWhisList(productInputs);
            return FormateData({whislist: basketResult })
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }
    async DeleteItem(productInputs){
        try{
            const basketResult = await this.repository.deleteToWhisList(productInputs);
            return basketResult;
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async DeleteAddress(productInputs){
        try{
            const AddressResult = await this.repository.deleteAdress(productInputs);
            return AddressResult;
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }

    async CreateWishList(productInputs){
        try{
            const basketResult = await this.repository.CreateWishList(productInputs);
            return basketResult;
        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }
    }


    async EditProfil(userInputs){
        
        const {id, name, email,  phone, age } = userInputs;
        try{
            
            const existingCustomer = await this.repository.EditProfil({id, name, email,  phone, age});

            return FormateData({id: existingCustomer._id });

        }catch(err){
            console.log("Error ==========");
            console.log(err);
            throw err;
        }

    }



}
module.exports = CustomerService;