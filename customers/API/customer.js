const CustomerService = require('../Service/customer-service');


module.exports = (app) => {
    
    const service = new CustomerService();
    
    app.post("/signup", async (req, res, next) => {
        try {
          const { name, email, password, phone, age } = req.body;
          console.log("Name",name);
          console.log("Mail",email);
          console.log("Password",password);
          console.log("Phone",phone);
          console.log("Age",age);
          console.log("----------")
          const { data } = await service.SignUp({ name, email, password, phone, age });
          return res.json(data);
        } catch (err) {
          next(err);
        }
      });
    
      app.get("/login", async (req, res, next) => {
        try {
          const { email, password } = req.query;
          console.log("End-Point Mail",email);
          console.log("End-Point Password",password);

          const { data } = await service.SignIn({ email, password });
    
          return res.json(data);
        } catch (err) {
          next(err);
        }
      });


      app.post("/addAddress",  async (req, res, next) => {
        try {
          
          const {_id, street, postalCode, city, country } = req.body;
    
          console.log(_id);
          console.log(street);
          const { data } = await service.AddNewAddress({_id,  street, postalCode, city,  country});
    
          return res.json(data);


        } catch (err) {
          next(err);
        }
      });

      app.get("/Address",  async (req, res, next) => {
        try {
          
          const id  = req.query._id;
    
          console.log(id);
          const { data } = await service.GetAddress(id);
    
          return res.json(data);


        } catch (err) {
          next(err);
        }
      });

    
      app.get("/profile", async (req, res, next) => {
        try {
          const id  = req.query.id;
          const { data } = await service.GetProfile( id );
          return res.json(data);
        } catch (err) {
          next(err);
        }
      });


      app.post('/createWishList', async(req,res,next) => {
        
        try {
            const { CustomerId, Products } = req.body; 
            const { data } =  await service.CreateWishList({ CustomerId, Products});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });



      app.post('/addItemWhisList', async(req,res,next) => {
        
        try {
            const { CustomerId, whislist} = req.body; 
            const { data } =  await service.AddItem({ CustomerId, whislist});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });
    app.delete('/deleteItemWhisList', async(req,res,next) => {
        
        try {
            const { CustomerId, productId} = req.body; 
            console.log(CustomerId);
            console.log(productId);
            const { data } =  await service.DeleteItem({ CustomerId, productId});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });

    app.delete('/deleteAddress', async(req,res,next) => {
        
      try {
          const { CustomerId, addressId} = req.body; 
          console.log(CustomerId);
          console.log(addressId);
          const { data } =  await service.DeleteAddress({ CustomerId, addressId});
          return res.json(data);            
      } catch (err) {
          next(err)    
      }
      
  });

  app.post("/editProfile", async (req, res, next) => {
    try {
      const { id, name, email, phone, age } = req.body;
      console.log(id);
      console.log(name);
      console.log(email);
      console.log(phone);
      const { data } = await service.EditProfil({ id, name, email, phone, age });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

   



}