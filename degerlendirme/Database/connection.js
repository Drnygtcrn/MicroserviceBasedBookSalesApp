const mongoose = require('mongoose');

module.exports = async() => {

    try {
        await mongoose.connect("mongodb://nosql-db:27017/denizdilbaz", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Db Connected');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
 
};