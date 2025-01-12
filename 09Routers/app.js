const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminroutes = require('./Routers/admin');
const shoproutes = require('./Routers/shop')
app.use(bodyParser.urlencoded({extended: false}));
app.use(adminroutes);
app.use(shoproutes);
app.use((req, res, next)=>{
    res.status(404).send("<h1>Page not found</h1>");
})
app.listen(3000);