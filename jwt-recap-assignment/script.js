// Program for generating a jwt but with different signature, to see that even if the contens are same, but the signature is different, the jwt can't be verified in the original content program

const jwt = require('jsonwebtoken')

const contents = {
    name: "Chaitanya",
    accountNumber: 777777
};

const newToken = jwt.sign(contents, 'anothersecret');

console.log(newToken)