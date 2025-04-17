const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@123',
    database: 'testdb'
})

connection.connect((err) =>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Connection has been created");

    const creationQuery = `create table IF NOT EXISTS students(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
    )`

    connection.execute(creationQuery, (err)=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }

        console.log("Table is created");
    })
})

module.exports = connection;