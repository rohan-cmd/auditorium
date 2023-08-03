const jwt = require("jsonwebtoken");

const Registration = require("../models/registration");
// const adminRegistration = require("../models/registration0");
 

const auth = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        if (token==null) {
            res.render("login");
        } else {
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

            // console.log(`The verify user : ${verifyUser._id}`);
            const user = await Registration.findOne({ _id: verifyUser._id });
            // console.log(`The user : ${user.email}`);
            // ue = user.email;

            req.token = token;
            req.user = user;

            next();
        } 
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = auth;