const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');


const app = express();

app.use(express.json());
app.use(cors());
/*
app.use('/product',proxy('http://localhost:8001'));
app.use('/customer',proxy('http://localhost:8002'));
app.use('/basket',proxy('http://localhost:8003'));
app.use('/order',proxy('http://localhost:8004'));
app.use('/degerlendirme',proxy('http://localhost:8005'));
app.use('/storage',proxy('http://localhost:8006'));
app.use('/whislist',proxy('http://localhost:8007'));*/

app.use('/product', proxy('http://products:8001'));
app.use('/customer', proxy('http://customer:8002'));
app.use('/basket', proxy('http://basket:8003'));
app.use('/order', proxy('http://order:8004'));
app.use('/degerlendirme', proxy('http://degerlendirme:8005'));
app.use('/storage', proxy('http://storage:8006'));
app.use('/whislist', proxy('http://whislist:8007'));




app.listen(8000, () => {
    console.log('Gateway is Listening to Port 8000')
})