const OrderService = require('../Service/order-service');


module.exports = (app) => {
    
    const service = new OrderService();


    app.post('/create', async(req,res,next) => {
        
        try {
            const { User, Books, address, status, total } = req.body;
            console.log(User.Username);
            const { data } =  await service.CreateOrder({ User, Books, address, status, total });
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });

    app.get('/getOrder', async(req,res,next) => {
        
        try {
            const { customerId } = req.query;
            const { data } =  await service.GetOrder({ customerId });
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });
    app.delete('/delete', async(req,res,next) => {
        
        try {
            const { OrderId } = req.body;
            const { data } =  await service.DeleteOrder({ OrderId });
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });

    app.post('/updateStatus', async(req,res,next) => {
        
        try {
            const { OrderId, Status } = req.body;
            const { data } =  await service.UpdateOrder({ OrderId, Status });
            return res.json(data);            
        } catch (err) {
            next(err)    
        }        
    });

    app.get('/getInvoice', async(req,res,next) => {
        
        try {
            const OrderId = req.query.OrderId;
            const { data } =  await service.getInvoice(OrderId);
            return res.json(data);            
        } catch (err) {
            next(err)    
        }        
    });
    



}