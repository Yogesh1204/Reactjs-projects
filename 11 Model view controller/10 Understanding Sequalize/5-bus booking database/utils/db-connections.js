// const express = require('express');
const mysql = require('mysql2');
// const app = express();

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

    const creationQueries = [
        `CREATE TABLE IF NOT EXISTS Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS Buses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            busNumber VARCHAR(50) UNIQUE NOT NULL,
            totalSeats INT NOT NULL,
            availableSeats INT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS Bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            busId INT NOT NULL,
            seatNumber INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
            FOREIGN KEY (busId) REFERENCES Buses(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS Payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            bookingId INT NOT NULL,
            amountPaid DECIMAL(10,2) NOT NULL,
            paymentStatus ENUM('Pending', 'Completed', 'Failed') NOT NULL,
            FOREIGN KEY (bookingId) REFERENCES Bookings(id) ON DELETE CASCADE
        )`
    ];

    // connection.execute(creationQueries, (err)=>{
    //     if(err){
    //         console.log(err);
    //         connection.end();
    //         return;
    //     }

    //     console.log("Table is created");
    // })

    creationQueries.forEach((query) => {
        connection.execute(query, (err) => {
            if (err) {
                console.log("Error creating table:", err);
                return;
            }
            console.log("Table created successfully");
        });
    });

    // connection.end();
})

module.exports = connection;