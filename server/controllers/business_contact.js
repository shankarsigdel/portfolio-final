/*
Name        :   Shankar Sigdel
Project Name:   Express Portfolio Authentication
Course Name :   Web Application Development
Course Code :   COMP229-005 (WAD)
Assignment  :   Assignment 02
Instructor  :   Aderson
Date        :   2020/10/19
*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

// create a reference to the model
let Contact = require('../models/business_contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);
            res.render('business_contact/list', 
            {title: 'Business Contacts', 
            ContactList: contactList,
            displayName: req.user ? req.user.displayName : '' });
        }
    }).sort('contact_name'); //  alphabetically sorted list of contacts  appears on Business Contact
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('business_contact/add', {title: 'Add Contact',
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "contact_name": req.body.contact_name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contact.create(newContact, (err, Contact) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list page
            res.redirect('/business-contacts');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToUpdate) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit view
            res.render('business_contact/update', {title: 'Update Contact', contact: contactToUpdate,
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "contact_name": req.body.contact_name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list page
            res.redirect('/business-contacts');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list page
            res.redirect('/business-contacts');
        }
    });
}