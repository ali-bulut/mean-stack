const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        //"bearer ksdkjdnjbs(token) -> token organization on headers"
        const token=req.headers.authorization.split(" ")[1];
        jwt.verify(token,"secret_key_that_should_be_longer");
        next();
    } catch (error) {
        res.status(401).json({message:'You are not authenticated to reach this page!'});   
    }

}
