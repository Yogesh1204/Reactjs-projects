const db = require('../utils/db-connections');

const addEntries = (req, res) => {
    const {email, name} = req.body;
    const insertQuery = 'INSERT INTO students (email, name) VALUES (?, ?)';

    db.execute(insertQuery, [email, name], (err)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            console.log("Something went wrong, but keeping DB alive.");
            return;
        }

        console.log('Values has been inserted');
        res.status(200).send(`Student with name ${name} successfully added`);
    })
}

const updateEntry = (req, res) =>{
    const {id} = req.params;
    const {name, email} = req.body;

    if(!id){
        return res.status(400).send("Student ID is required");
    }
    let updatefields = [];
    let values = [];
    
    if(name){
        updatefields.push("name=?");
        values.push(name);
    }
    if(email){
        updatefields.push("email=?");
        values.push(email);
    }

    if (updatefields.length === 0) {
        return res.status(400).send("No fields to update");
    }

    const updateQuery = `UPDATE students SET ${updatefields.join(', ')} WHERE id = ?`;
    values.push(id);
    db.execute(updateQuery, values, (err, result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            // db.end();
            return;
        }

        if(result.affectedRows ===0){
            res.status(404).send("Student not found");
            return;
        }

        res.status(200).send("User has been updated");
    })
}

const deleteEntry = (req, res) =>{
    const {id} = req.params;
    const {name} = req.body;
    const deleteQuery = 'DELETE FROM students WHERE id = ?';

    db.execute(deleteQuery,[id], (err, result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }

        if(result.affectedRows ===0){
            res.status(404).send("Student not found");
            return;
        }

        res.status(200).send(`User with id ${id} is deleted`);
    })
}

module.exports = {
    addEntries,
    updateEntry,
    deleteEntry
}