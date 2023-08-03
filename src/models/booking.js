const mongoose = require("mongoose");

const bookingSchema  = new mongoose.Schema({
    bname : { 
        type:String,
        required:true, 
    },
    topic_event : {
        type:String,
        required:true,
    },
    event_date : {
        type:String, 
        required:true,
    },
    event_time_from : {
        type:String,
        required:true,
    },
    event_time_to : {
        type:String,
        required:true,
    },
    email : { 
        type:String,
        required:true,
    },
    volunter_req : {
        type:String,
        required:true,
    },
    guest_speaker_name : {
        type:String,
        required:true,
    },
    theme_of_event : {
        type:String,
        required:true,
    },
    mic_req : {
        type:String,
        required:true,
    },
    projector : {
        type:String,
        required:true,
    },
    refreshment : {
        type:String,
        required:true,
    },
    current_time : {
        type : String,
        required:true
    },
    request : {
        type : String,
        required:true
    }
})

const Booking = new mongoose.model("Booking",bookingSchema); 
module.exports = Booking;