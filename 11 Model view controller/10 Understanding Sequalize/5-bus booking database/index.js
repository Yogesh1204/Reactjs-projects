const express = require('express');
const db = require('./utils/db-connections');
const busRoutes = require('./routers/bus_routes');
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello world');
})

app.use('/', busRoutes);

app.listen(3000, (err)=>{
    console.log('server is running');
})