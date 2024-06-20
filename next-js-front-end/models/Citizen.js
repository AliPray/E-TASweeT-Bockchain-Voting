const mongoose = require('mongoose');

const CitizenSchema = new mongoose.Schema({
    voterId: {
        type: Number,
        required: [true,'Please add a Voter Id number'],
        unique: true,
     },
     firstName: {
        type: String,
        required: [true,'Please add first name of citizen'],
        trim: true,
     },
     lastName: {
        type: String,
        required: [true,'Please add a last name of citizen'],
        trim: true,
     },
     state: {
        type: String,
        required: [true,'Please add state of citizen'],
        trim: true,
     }

})


module.exports = mongoose.models.Citizen || mongoose.model('Citizen', CitizenSchema);
