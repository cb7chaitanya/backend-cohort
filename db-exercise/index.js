const express = require('express');
const mongoose = require('mongoose');
const app = express()

app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL)

const User = mongoose.model('Users', {name: String, email: String, password: String});

app.post("/signup", async function(req,res){
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    const existingUser =  await User.findOne({
        email: username
    });

    if(existingUser){
        return res.status(400).send("User already exists");
    }

    const user = new User({
        email: username, 
        name: name, 
        password: password
    });
    user.save();
    res.status(200).json({
        msg: "User created successfully"
    })
})

app.listen(3000)