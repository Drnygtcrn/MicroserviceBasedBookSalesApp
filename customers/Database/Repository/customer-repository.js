const { CustomerModel} = require("../models");
const {AddressModel} = require("../models")



class CustomerRepository {
    async CreateCustomer({ name, email, password, phone, age}) {
        try {
          console.log("Name",name);
          console.log("Mail",email);
          console.log("Password",password);
          console.log("Phone",phone);
          console.log("Age",age);

          const existingCustomer = await CustomerModel.findOne({ email: email });
          
          if(existingCustomer == null){
            const customer = new CustomerModel({ name, email, password, phone, age });
            const customerResult = await customer.save();
            console.log("sadasdasdasdasd");
            return customerResult;
          }
          else{
            return "null";
          }

        } catch (err) {
          console.log("Error ========= Kullanıcı oluşturulamadı");
          console.log(err);
          throw err; 
        }
      }

      async FindCustomer({ email }) {
        try {
          console.log("Kullanıcıyı arayan mail",email);
          const existingCustomer = await CustomerModel.findOne({ email: email });
          return existingCustomer;
        } catch (err) {
          console.log("Error ========= Kullanıcı bulunamadı");
          console.log(err);
          throw err; 
        }
      }


      async GetAddress( id ) {
        try {
          const profile = await CustomerModel.findOne({_id : id});
          const addressResult = profile.address;
         
          return addressResult;

        } catch (err) {
          console.log("Error ========= Kullanıcı bulunamadı");
          console.log(err);
          throw err;
        }
      }


      async CreateAddress({ _id, street, postalCode, city, country }) {
        try {
          const profile = await CustomerModel.findOne({_id:_id});
          const check = false;
          if (profile) {
            profile.address.push({street,  postalCode, city, country, check });
          }
          // diğer adreslerin check'i false yap.
    
          return await profile.save();

        } catch (err) {
          console.log("Error ========= Kullanıcı bulunamadı");
          console.log(err);
          throw err;
        }
      }

      async FindCustomerById(id) {
        try {
          const existingCustomer = await CustomerModel.findOne({_id:id});
          return existingCustomer;
        } catch (err) {
          console.log("Error ========= Kullanıcı bulunamadı");
          console.log(err);
          throw err;
        }
      }

      async addToWhisList({CustomerId, whislist}) {
        try {                                        
          const { proid, name, author, publisher, publication_year, number_of_pages, language,  price, type} = whislist[0];
    
          
    
          const existingCustomer = await CustomerModel.findOne({_id: CustomerId});
    
          existingCustomer.whislist.push({ proid, name, author, publisher, publication_year, number_of_pages, language,  price, type});
    
          const addResult = await existingCustomer.save()
    
          return existingCustomer.whislist;
        } catch (err) {
          console.log("Error ========= Isim bulunamadı ya da getirilemedi");
          console.log(err);
          throw err; 
        }
      }
      async deleteToWhisList({CustomerId, productId}) {
        try {  
          
          console.log(CustomerId);
          console.log(productId);
          const existingCustomer = await CustomerModel.findOne({ _id: CustomerId });
    
          console.log(existingCustomer);
    
          existingCustomer.whislist = existingCustomer.whislist.filter(product => product.proid.toString() !== productId);
    
          console.log(existingCustomer.whislist);
          const updatedCustomer = await existingCustomer.save();
    
          return updatedCustomer;
        } catch (err) {
          console.log("Error ========= Isim bulunamadı ya da getirilemedi");
          console.log(err);
          throw err; 
        }
      }

      async deleteAdress({CustomerId, addressId}) {
        try {  
          
          console.log(CustomerId);
          console.log(addressId);
          const existingCustomer = await CustomerModel.findOne({ _id: CustomerId });
    
          console.log(existingCustomer);
    
          existingCustomer.address = existingCustomer.address.filter(adres => adres._id.toString() !== addressId);
    
          console.log(existingCustomer.address);
          const updatedCustomer = await existingCustomer.save();
    
          return updatedCustomer;
        } catch (err) {
          console.log("Error ========= Isim bulunamadı ya da getirilemedi");
          console.log(err);
          throw err; 
        }
      }
      
      async EditProfil({id, name, email, phone, age }) {
        try {
          const existingCustomer = await CustomerModel.findOne({ _id: id });
          
          if(name != null){
            existingCustomer.name = name;
          }
          if(email != null){
            existingCustomer.email = email;
          }
          if(phone != null){
            existingCustomer.phone = phone;
          }
          if(age != null){
            existingCustomer.age= age;
          }
         
    
          const CustomerResult = await existingCustomer.save();
          return CustomerResult;
        } catch (err) {
          console.log("Error ==========");
          console.log(err);
          throw err; 
        }
      }
  

}

module.exports = CustomerRepository;
