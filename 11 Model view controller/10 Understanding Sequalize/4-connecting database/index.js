const express = require('express');
const db = require('./utils/db-connections');
const studentRoutes = require('./routers/studentRoutes');
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello world');
})

app.use('/students', studentRoutes);

app.listen(3000, (err)=>{
    console.log('server is running');
})