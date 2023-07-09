const BasketService = require('../Service/basket-service');


module.exports = (app) => {
    
    const service = new BasketService();
    

    app.get('/get', async(req,res,next) => {
        
        try {
            const CustomerId   = req.query.CustomerId; 
            const { data } =  await service.GetBasket(CustomerId);
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });






    app.post('/create', async(req,res,next) => {
        
        try {
            const CustomerId = req.query.CustomerId; 
            console.log(CustomerId);
            const { data } =  await service.CreateBasket(CustomerId);
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });

    app.post('/addItem', async(req,res,next) => {
        
        try {
            const { CustomerId, Products} = req.body; 
            const { data } =  await service.AddItem({ CustomerId, Products});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });

    app.post('/addItemWhislist', async(req,res,next) => {
        
        try {
            const { CustomerId, Products} = req.body; 
            const { data } =  await service.AddItemWhislist({ CustomerId, Products});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });



    app.post('/updateUpQuantity', async(req,res,next) => {
        
        try {
            const { CustomerId, ProductId} = req.body; 
            const { data } =  await service.UpdateUp({ CustomerId, ProductId});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });
    app.post('/updateDownQuantity', async(req,res,next) => {
        
        try {
            const { CustomerId, ProductId} = req.body; 
            const { data } =  await service.UpdateDown({ CustomerId, ProductId});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });


    app.delete('/deleteItem', async(req,res,next) => {
        
        try {
            const { CustomerId, productId} = req.body; 
            const { data } =  await service.DeleteItem({ CustomerId, productId});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });

    app.delete('/deleteAll', async(req,res,next) => {
        
        try {
            const CustomerId = req.body.CustomerId; 
            const { data } =  await service.deleteAll(CustomerId);
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });



}