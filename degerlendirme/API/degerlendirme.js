const DegerlendirmeService = require('../Service/degerlendirme-service');


module.exports = (app) => {
    
    const service = new DegerlendirmeService();

    app.post('/create', async(req,res,next) => {
        
        try {
            const { User, Book, rating ,comment } = req.query; 

            const parsedUser = JSON.parse(User);
            const parsedBook = JSON.parse(Book);
            console.log(User);
            console.log(Book);
            console.log(rating);
            console.log(comment);
            const { data } =  await service.CreateReview({ User: parsedUser, Book:parsedBook, rating ,comment });
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });


    app.get('/getByCustomer', async(req,res,next) => {
        try {
            const CustomerID = req.query.CustomerID;
            console.log(CustomerID);
            const { data } = await service.GetReviewsByCustomer(CustomerID)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/getByProduct', async(req,res,next) => {
        try {
            const ProductID = req.query.ProductID;
            const { data } = await service.GetReviewsByProduct(ProductID)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    
    app.delete('/delete', async(req,res,next) => {
        try {
            const commentId = req.query.commentId;
            const { data } = await service.DeleteComment(commentId);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.post('/editComment', async(req,res,next) => {
        try {
            const {commentId, comment, rating} = req.body;
            const { data } = await service.UpdateComment({commentId, comment, rating});
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });
    



}