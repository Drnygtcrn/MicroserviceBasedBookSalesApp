const StorageService = require('../Service/storage-service');


module.exports = (app) => {
    
    const service = new StorageService();


    app.post('/create', async(req,res,next) => {
        
        try {
            const {  Book, quantity } = req.body; 
            const { data } =  await service.CreateStorage({Book, quantity});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });
    app.post('/decrase', async(req,res,next) => {
        
        try {
            const {  ProductID, quantity } = req.body; 
            const { data } =  await service.DecraseStorage({ProductID, quantity});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });

    app.post('/increase', async(req,res,next) => {
        
        try {
            const {  ProductID, quantity } = req.body; 
            const { data } =  await service.IncreaseStorage({ProductID, quantity});
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });
    
    app.get('/all', async (req,res,next) => {
        try {
            const {data} = await service.GetStorages();        
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
        
    });

    

    app.get('/getByProduct', async(req,res,next) => {
        try {
            const ProductID = req.body.ProductID;
            const { data } = await service.GetStoragesByProduct(ProductID)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.delete('/delete', async(req,res,next) => {
        try {
            const ProductID = req.body.ProductID;
            const { data } = await service.DeleteBook(ProductID)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/control', async(req,res,next) => {
        try {
            const booksParam = req.query.books;
            const decodedBooksParam = decodeURIComponent(booksParam);
            const books = JSON.parse(decodedBooksParam);
            console.log(books);

            const isValid = await service.ControlBook(books);
            return res.status(200).json({ isValid: isValid });

        } catch (err) {
            next(err)
        }

    });

    app.get('/decreaseall', async(req,res,next) => {
        try {
            const booksParam = req.query.books;
            const decodedBooksParam = decodeURIComponent(booksParam);
            const books = JSON.parse(decodedBooksParam);

            const isValid = await service.DecreaseBook(books);
            return res.status(200).json({ isValid: isValid });

        } catch (err) {
            next(err)
        }

    });
    

    



}