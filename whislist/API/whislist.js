const WhislistService = require('../Service/whislist-service');


module.exports = (app) => {
    
    const service = new WhislistService();
    
    app.post('/create', async(req,res,next) => {
        
        try {
            const CustomerId = req.query.CustomerId; 
            const { data } =  await service.CreateWhislist( CustomerId);
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

    app.delete('/deleteItem', async(req,res,next) => {
        
        try {
            const { CustomerId, productId} = req.body; 
            const { data } =  await service.DeleteItem({ CustomerId, productId});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });

    app.get('/get', async(req,res,next) => {
        
        try {
            const CustomerId   = req.query.CustomerId; 
            const { data } =  await service.GetWhislist(CustomerId);
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });
    


}