/*
Name        :   Shankar Sigdel
Project Name:   Express Portfolio Authentication
Course Name :   Web Application Development
Course Code :   COMP229-005 (WAD)
Assignment  :   Assignment 02
Instructor  :   Aderson Oliveira
Date        :   2020/10/19
*/let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
    contact_name: String,
    number: String,
    email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);