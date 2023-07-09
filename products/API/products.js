const ProductService = require('../Service/product-service');


module.exports = (app) => {
    
    const service = new ProductService();


    app.post('/create', async(req,res,next) => {
        
        try {
            const { name, author, publisher, publication_year, number_of_pages, language, price, type, img } = req.query; 
            const { data } =  await service.CreateProduct({ name, author, publisher, publication_year, number_of_pages, language, price, type, img });
            return res.json(data);            
        } catch (err) {
            next(err)    
        }
        
    });

    app.get('/getByName', async(req,res,next) => {
        try {
            const productName = req.query.name;
            console.log("Product Ismi",productName);
            const { data } = await service.GetProductDescription(productName);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/get', async(req,res,next) => {
        try {
            const id = req.query._id;
            console.log("Product Ismi",id);
            const { data } = await service.Get(id);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/all', async (req,res,next) => {
        try {
            const {data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
        
    });

    app.get('/getByType', async(req,res,next) => {
        try {
            const type = req.query.type;
            const { data } = await service.GetProductsByCategory(type)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/getByName', async(req,res,next) => {
        try {
            const name = req.query.name;
            const { data } = await service.GetProductsByName(name);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/getByAuthor', async(req,res,next) => {
        try {
            const author = req.query.author;
            const { data } = await service.GetProductsByAuthor(author);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/getByPublisher', async(req,res,next) => {
        try {
            const publisher = req.query.publisher;
            const { data } = await service.GetProductsByPublisher(publisher);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.delete('/delete', async(req,res,next) => {
        try {
            const id = req.query.id;
            const { data } = await service.DeleteProduct(id);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.post('/update', async(req,res,next) => {
        try {
            const { id, name, author, publisher, publication_year, number_of_pages, language, price, type, img } = req.query;
            const { data } =  await service.UpdateProduct({ id, name, author, publisher, publication_year, number_of_pages, language, price, type, img });
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    



}