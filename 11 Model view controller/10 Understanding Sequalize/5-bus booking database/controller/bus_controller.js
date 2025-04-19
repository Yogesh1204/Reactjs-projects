const db = require('../utils/db-connections');
// app.use(express.json()); // Make sure this is at the top

const addUser = (req, res) => {
    // console.log("hii");
    const {name, email} = req.body;
    const insertQuery = 'INSERT INTO Users (name, email) VALUES (?, ?)';
    // console.log(name, email);

    db.execute(insertQuery, [name, email], (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(500).send('Error inserting user');
        }
        res.status(201).send('User added successfully');
    })
}

const getUser = (req, res) =>{
    const query = 'SELECT * FROM Users';

    db.execute(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error fetching users');
        }
        res.status(200).json(results);
    });
}

const addBus = (req, res) =>{
    const { busNumber, totalSeats, availableSeats } = req.body;
    const query = 'INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)';

    db.execute(query, [busNumber, totalSeats, availableSeats], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error inserting bus');
        }
        res.status(201).send('Bus added successfully');
    });
}

const availableBusSeats = (req, res) =>{
    const minSeats = parseInt(req.params.seats);
    const query = 'SELECT * FROM Buses WHERE availableSeats > ?';

    db.execute(query, [minSeats], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error fetching buses');
        }
        res.status(200).json(results);
    });
}

module.exports = {
    addUser,
    getUser,
    addBus,
    availableBusSeats
}