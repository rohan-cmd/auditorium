require('dotenv').config(); // always put thin on 1st line 
const path = require('path');
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
// require HBS for partial 
const hbs = require("ejs");
// importing database file 
require("./db/conn");
// importing user registration schema
const Registration = require("./models/registration");
// importing admin registration schema
const adminRegistration = require("./models/registration0");
// importing user booking schema 
const Booking = require("./models/booking");
// importing bcrypt
const bcrypt = require("bcryptjs");
// importing cookie-parser
const cookieParser = require("cookie-parser");
//importing auth
const auth = require("./middleware/auth");
//importing auth0
const auth0 = require("./middleware/auth0");

// path
const staticPath = path.join(__dirname, "../public");
const tamplatePath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

// telling that we are using json in our code
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); // telling that i want data from reg form you can can not sey it undefine

// set view engine
app.set("view engine", "ejs");
// changing the dir views to temlate
app.set("views", tamplatePath);
// public static path
app.use(express.static(staticPath));
// register the partial
// hbs.registerPartials(partialsPath);

// printing secret key
// console.log(process.env.SECRET_KEY);

// routing 
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/booking", auth, (req, res) => {
    //getting cookies value
    // console.log(`displaying cookies : ${req.cookies.jwt}`);
    res.render("booking");
});

app.get("/request", auth, (req, res) => {
    //getting cookies value
    // console.log(`displaying cookies : ${req.cookies.jwt}`);
    // res.render("request");  

    //--------------------------------------------------------------------------
    // const token = req.cookies.jwt;
    // console.log(token);
    // console.log(`the token : ${token}`);
    // --------------------------------------------------------------------------

    const booking = Booking.find({}, function (err, booking) {
        if (err) {
            console.log(err);
        } else {
            // console.log(booking);
            res.render("request", { booking });
        }
    });

    // --------------------------------------------------------------------------
});

// app.get("/contact", (req, res)=>{
//     res.render("contact");  
// });

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/registration", (req, res) => {
    res.render("registration");
});

// Logout
app.get("/logout", auth, async (req, res) => {
    try {
        // console.log(req.user);
        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token != req.token;
        });
        res.clearCookie("jwt");
        loggedin = false;
        // console.log("Logout Successfully!!");
        await req.user.save();
        res.render("login");
    } catch (error) {
        res.status(500).send(error);
    }
});

// admin login
app.get("/login0", (req, res) => {
    res.render("login0");
});
// admin registration
app.get("/registration0", (req, res) => {
    res.render("registration0");
});

app.get("/dashboard", auth0, (req, res) => {
    //getting cookies value
    // console.log(`displaying cookies : ${req.cookies.jwt}`);
    // res.render("dashboard");  

    // --------------------------------------------------------------------------

    const booking = Booking.find({}, function (err, booking) {
        if (err) {
            console.log(err);
        } else {
            // console.log(booking);
            res.render("dashboard", { booking });
        }
    });

    // Booking.find({}).then((x)=>{
    //     res.render("dashboard", {x}); 
    // }).catch((y)=>{
    //     console.log(y);
    // })

    // --------------------------------------------------------------------------
});

app.get("/acc", auth0, (req, res) => {
    //getting cookies value
    // console.log(`displaying cookies : ${req.cookies.jwt}`);
    // res.render("acc");

    // --------------------------------------------------------------------------

    const booking = Booking.find({}, function (err, booking) {
        if (err) {
            console.log(err);
        } else {
            // console.log(booking);
            res.render("acc", { booking });
        }
    });

    // --------------------------------------------------------------------------

});

app.get("/rej", auth0, (req, res) => {
    //getting cookies value
    // console.log(`displaying cookies : ${req.cookies.jwt}`);
    // res.render("acc");

    // --------------------------------------------------------------------------

    const booking = Booking.find({}, function (err, booking) {
        if (err) {
            console.log(err);
        } else {
            // console.log(booking);
            res.render("rej", { booking });
        }
    });
    // --------------------------------------------------------------------------

});

// Logout 0
app.get("/logout0", auth0, async (req, res) => {
    try {
        // console.log(req.user);
        req.admin.tokens = req.admin.tokens.filter((currElement) => {
            return currElement.token != req.token;
        });
        res.clearCookie("jwt");
        // console.log("Logout Successfully!!");
        await req.admin.save();
        res.render("login0");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/dashboard0", (req, res) => {
    res.render("dashboard0");
});

// Accepted --------------------------------------------------------
app.get("/accept/:id", (req, res) => {
    let readQuery = req.params.id;
    // console.log(`the parameters : ${readQuery}`);
    // res.send("the parameter");
    const updateBooking = async (_id) => {
        try {
            const result = await Booking.updateOne({ _id }, {
                $set: {
                    request: "ACCEPTED"
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    updateBooking(readQuery);
    // rendering booking
    res.render("dashboard0");
});
// --------------------------------------------------------

// Rejected --------------------------------------------------------
app.get("/reject/:id", (req, res) => {
    let readQuery = req.params.id;
    // console.log(`the parameters : ${readQuery}`);
    // res.send("the parameter");
    const updateBooking = async (_id) => {
        try {
            const result = await Booking.updateOne({ _id }, {
                $set: {
                    request: "REJECTED"
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    updateBooking(readQuery);
    // rendering booking
    res.render("dashboard0");
});
// --------------------------------------------------------

app.get("*", (req, res) => {
    res.render("404err");
});

// Register --------------------------------------------------------

app.post("/registration", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirm_password;

        if (password === cpassword) {
            const registrationUser = new Registration({
                uname: req.body.uname,
                mobile: req.body.mobile,
                email: req.body.email,
                password: req.body.password,
                confirm_password: req.body.confirm_password
            })

            // Token --------------------------------
            // console.log("The success part : " + registrationUser);
            const token = await registrationUser.generateAuthToken();
            // console.log("The token part " + token);
            // --------------------------------

            // generating cookies
            // res.cookie("jwt", token);
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true
            });

            const registered = await registrationUser.save();
            res.status(201).render("login");
        } else {
            res.send("Password are not matching");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

// --------------------------------------------------------

// Login --------------------------------------------------------

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(`${email} : ${password}`);

        const useremail = await Registration.findOne({ email: email });
        // console.log(useremail.email);
        // console.log(useremail.password);
        // res.send(useremail);

        const isMatch = await bcrypt.compare(password, useremail.password);

        // token
        const token = await useremail.generateAuthToken();
        // console.log("The token part " + token);

        // generating token
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        });

        if (isMatch) {
            // usestate here
            // loggedin = true;
            res.status(201).render("index");
        } else {
            res.send("Invalid login details!!")
        }

    } catch (error) {
        res.status(400).send("Invalid Password Details!!!");
    }
});

// --------------------------------------------------------

// Booking --------------------------------------------------------

app.post("/booking", async (req, res) => {
    try {
        const datetime = new Date();
        const hours = datetime.getHours();
        const minutes = datetime.getMinutes();
        const sec = datetime.getSeconds();
        const date = datetime.toISOString().slice(0, 10);

        const userBooking = new Booking({
            bname: req.body.bname,
            topic_event: req.body.topic_event,
            event_date: req.body.event_date,
            event_time_from: req.body.event_time_from,
            event_time_to: req.body.event_time_to,
            email: req.body.email,
            volunter_req: req.body.volunter_req,
            guest_speaker_name: req.body.guest_speaker_name,
            theme_of_event: req.body.theme_of_event,
            mic_req: req.body.mic_req,
            projector: req.body.projector,
            refreshment: req.body.refreshment,
            current_time: `${date}/${hours}:${minutes}:${sec}`,
            request: `PENDING`
        })
        const booked = await userBooking.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
});

// --------------------------------------------------------


// Admin Registration --------------------------------------------------------

app.post("/registration0", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirm_password;

        if (password === cpassword) {
            const registrationAdmin = new adminRegistration({
                uname: req.body.uname,
                mobile: req.body.mobile,
                email: req.body.email,
                password: req.body.password,
                confirm_password: req.body.confirm_password
            })

            // Token --------------------------------
            // console.log("The success part : " + registrationUser);
            const token = await registrationAdmin.generateAuthToken();
            // console.log("The token part " + token);
            // --------------------------------

            // generating cookies
            // res.cookie("jwt", token);

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true
            });

            const registered = await registrationAdmin.save();
            res.status(201).render("login0");
        } else {
            res.send("Password are not matching");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

// --------------------------------------------------------


// Admin Login --------------------------------------------------------

app.post("/login0", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(`${email} : ${password}`);

        const adminemail = await adminRegistration.findOne({ email: email });
        // console.log(useremail.email);
        // console.log(useremail.password);
        // res.send(useremail);

        const isMatch = await bcrypt.compare(password, adminemail.password);

        // token
        const token = await adminemail.generateAuthToken();
        // console.log("The token part " + token);

        // generating token
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        });

        if (isMatch) {
            res.status(201).render("dashboard0");
        } else {
            res.send("Invalid login details!!")
        }

    } catch (error) {
        res.status(400).send("Invalid Password Details!!!");
    }
});

// --------------------------------------------------------

app.listen(port, () => {
    console.log("listning on port " + port);
}); 