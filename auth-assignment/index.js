const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = '123456';
const app = express();
app.use(express.json());

const ALL_USERS = [
    {
        username: "user1@gmail.com",
        password: "password1",
        name: "user1",
    },
    {
        username: "user2@gmail.com",
        password: "password2",
        name: "user",
    },
    {
        username: "admin@gmail.com",
        password: "password3",
        name: "admin",
    },
];

function userExists (username, password){
    const userExists = ALL_USERS.find(user => user.username === username && user.password === password);
    if(userExists){
        return true;
    }
    return false;
}

app.post('/signin', function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        res.status(401).json({
            msg: "User doesn't exist in our in memory db"
        });
    }

    var token = jwt.sign({username: username}, jwtPassword);
    return  res.json({
        token, 
    });
});

app.get("/users", function(req, res){
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        res.json({
            users: ALL_USERS.filter(function(value){
                if(value.username == username){
                    return false;
                }
                else{
                    return true;
                }
            })
        })
    }
    catch(err){
        return res.status(403).json({
            msg: "Invalid Token"
        })
    }
})

app.listen(3000)