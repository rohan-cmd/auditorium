const jwt = require("jsonwebtoken");

const adminRegistration = require("../models/registration0");

const auth0 = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token==null) {
            res.render("login0");
        } else {
            const verifyAdmin = jwt.verify(token, process.env.SECRET_KEY);

                const admin = await adminRegistration.findOne({ _id: verifyAdmin._id });
                // console.log(admin.email);
                req.token = token;
                req.admin = admin;

                if (admin.email=="admin@gmail.com") {
                    next();
                } else {
                    res.render("login0");
                }
        } 
    } catch (error) {
        res.status(401).send("Something Went Wrong!!!");
    }
}

module.exports = auth0; 