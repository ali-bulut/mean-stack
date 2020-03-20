const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        //"bearer ksdkjdnjbs(token) -> token organization on headers"
        const token=req.headers.authorization.split(" ")[1];
        //by using jwt.verify we can verify our token whether is valid or not.
        //in order to access extra fields which are given by us to token; (we can also use jwt.verify without const.)
        //decodedToken returns us data which are user's email and id that were given to token when the token was created).
        const decodedToken = jwt.verify(token,"secret_key_that_should_be_longer");
        //by using this we can add extra fields to our request.
        //we created userData field in order to access user information from token.
        //now we can access this field from anywhere by using check-auth middleware.
        req.userData = {email:decodedToken.email, userId:decodedToken.userId};
        next();
    } catch (error) {
        res.status(401).json({message:'You are not authenticated!'});   
    }

}
