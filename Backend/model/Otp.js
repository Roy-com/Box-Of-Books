const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otpSchema = new Schema({

code: {type:String},
expireIn: {type:Number},
email: {type:String},
}
);

module.exports = mongoose.model("Otp", otpSchema);
