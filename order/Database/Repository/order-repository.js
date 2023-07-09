const { OrderModel} = require("../models");

class OrderRepository {
    async CreateOrder({ User, Books, address, status,total}) {
        try {
          const payment = false;
          const product = new OrderModel({User, Books, address, status, payment, total});
          const productResult = await product.save();
          return productResult;
        } catch (err) {
          console.log("Error ==========");
          console.log(err);
          throw err; 
        }
    }

    async GetOrder({customerId}) {
        try {
          
            const existingOrders = await OrderModel.find({  $and: [
              { 'User.UserId': customerId },
              { payment: true }
            ] });
            return existingOrders;
        } catch (err) {
          console.log("Error ==========");
          console.log(err);
          throw err; 
        }
    }

    async DeleteOrder({OrderId}) {
        try {
          
            const existingOrder = await OrderModel.findOne({ _id: OrderId });

            if (existingOrder && existingOrder.status === 'hazırlanıyor') {
                await existingOrder.deleteOne();
                return "Sipariş iptal edildi.";
            }
            else{
            return "Sipariş silinemez";
            }
        } catch (err) {
          console.log("Error ==========");
          console.log(err);
          throw err; 
        }
    }

    async UpdateOrder({OrderId,Status}) {
        try {
          
            const existingOrder = await OrderModel.findOne({ _id: OrderId});
            existingOrder.status = Status;
            const sonuc = await existingOrder.save();
            return sonuc;
        } catch (err) {
          console.log("Error ==========");
          console.log(err);
          throw err; 
        }
    }

    async getInvoice(OrderId) {
      try {
        
          const existingOrder = await OrderModel.findOne({ _id: OrderId});
          existingOrder.payment = true;
          const sonuc = await existingOrder.save();
          const Username = existingOrder.User.Username;
          const adres = existingOrder.address;
          const kitaplar = existingOrder.Books;
          const total = existingOrder.total;
          return{ Username, kitaplar, adres , total }
          
      } catch (err) {
        console.log("Error ==========");
        console.log(err);
        throw err; 
      }
  }
    
    
  
  
}

module.exports = OrderRepository;
