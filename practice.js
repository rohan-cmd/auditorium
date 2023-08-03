// DATE -----------------------------------------------------------------------------
/*
const datetime = new Date();
const hours = datetime.getHours();
const minutes = datetime.getMinutes(); 
const sec = datetime.getSeconds();
// console.log(datetime.toISOString().slice(0,10));
const date = datetime.toISOString().slice(0,10);

console.log(hours);
console.log(minutes);
console.log(sec);


// var datetime = new Date(new Date()-3600*1000*3).toISOString();;
// console.log(datetime);

// var datetime = new Date();
// console.log(datetime.toISOString().slice(0,10));

console.log(`${date}_${hours}:${minutes}:${sec}`);
*/
// DATE -----------------------------------------------------------------------------

// BCRYPT ----------------------------------------------------------------------------------------------
/*
const bcrypt = require("bcryptjs");
const securePassword = async (password) =>{
    // encrypting password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    
    // comparing password
    const passwordMatch = await bcrypt.compare(password, passwordHash);
    console.log(passwordMatch);
    
}

securePassword("rohan");
// BCRYPT ----------------------------------------------------------------------------------------------
*/

// JWT TOKEN ---------------------------------------------------------------------------------------
/*
const express = require("express");
const app = express();

const jsw = require("jsonwebtoken");
const JsonWebTokenError = require("jsonwebtoken/lib/JsonWebTokenError");

// generating webtoken using secrete key
const createToken = async() => {
    const token = await jsw.sign({_id:"6377a5d9c5515f59172ac6e0"},"cccbookingusinghtmlcssjsnodemongo",{
        expiresIn : "2 seconds"
    });
    console.log(token);

    const userver = await jsw.verify(token,"cccbookingusinghtmlcssjsnodemongo");
    console.log(userver);
}

createToken();

app.listen(8000, ()=>{
    console.log("listning on port " + 8000);
}); 
*/
// JWT TOKEN ---------------------------------------------------------------------------------------

// 
// Auth0 ---------------------------------------------------------------------------------------
const jwt = require("jsonwebtoken");

// const Registration = require("../models/registration");
// const adminRegistration = require("../models/registration0");


// const auth0 = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
//         // console.log(verifyUser);

//         const user = await adminRegistration.findOne({ _id: verifyUser._id });
//         console.log(verifyUser._id);
//         next();
//     } catch (error) {
//         res.status(401).send(error);
//     }
// }

// module.exports = auth0;
// JWT TOKEN ---------------------------------------------------------------------------------------



// {/* <div class="tb">
//                     <table class="table">
//                         <tr>
//                             <th>Name</th>
//                             <th>Topic Of Event</th>
//                             <th>Event Date</th>
//                             <th>Time of Event : From</th>
//                             <th>Time of Event : To</th>
//                             <th>No. of Person</th>
//                             <th>Volunteer Required</th>
//                             <th>Guest Speaker</th>
//                             <th>Theme of Event</th>
//                             <th>Mic Required</th>
//                             <th>Projector</th>
//                             <th>Refreshment</th>
//                             <th>Current Time</th>
//                             <th>Status</th>
//                             <th colspan="2">Request</th>
//                         </tr>
//                         <%for(let i=0; i<booking.length; i++){%>
//                             <tr>
//                                 <td><%=booking[i].bname%></td>
//                                 <td><%=booking[i].topic_event%></td>
//                                 <td><%=booking[i].event_date%></td>
//                                 <td><%=booking[i].event_time_from%></td>
//                                 <td><%=booking[i].event_time_to%></td>
//                                 <td><%=booking[i].no_of_person%></td>
//                                 <td><%=booking[i].volunter_req%></td>
//                                 <td><%=booking[i].guest_speaker_name%></td>
//                                 <td><%=booking[i].theme_of_event%></td>
//                                 <td><%=booking[i].mic_req%></td>
//                                 <td><%=booking[i].projector%></td>
//                                 <td><%=booking[i].refreshment%></td>
//                                 <td><%=booking[i].current_time%></td>
//                                 <td><%=booking[i].request%></td>
//                                 <td><a href="/updacc/<%= booking._id%>">Accepted</a></td>
//                                 <td><a href="/reject/{{booking._id}}">Rejected</a></td>
//                             </tr>
//                         <%}%> */}


{/* <style>
        .table td, .table th{
            padding: 10px;
            text-align: center;
            font-size: 16px;
        }
        .table th{
            background: #2e2e2e;
            color: #fff;
        }
        .tb{
            height: 100%;
            width: 1100px;
            overflow: auto;
        }
    </style> */}

    // const token = req.cookies.jwt;
    // console.log(token);