const express = require('express');
const cors = require('cors');
const { storages } = require('./API');
const { databaseConnection } = require('./database');

const PORT = 8006;

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors());
  app.use(express.static(__dirname + '/public'));

  app.use((req, res, next) => {
    console.log(req);
    next();
  });

  // API
  storages(app);

  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  }).on('error', (err) => {
    console.log(err);
    process.exit();
  });
};

StartServer();





/*const express = require('express');
const { databaseConnection } = require('./Database');
const expressApp = require('./express-app');

const PORT = 8001;

const StartServer = async() => {

    const app = express();
    
    await databaseConnection();
    
    await express(app);


    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();*/