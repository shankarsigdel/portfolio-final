let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let passport = require('passport');

// connect to Contact Model
//let Contact = require('../models/business_contact');

let contactController = require('../controllers/business_contact')

function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Router for the Business Contact page - READ Operation */
router.get('/', contactController.displayContactList); 

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, contactController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, contactController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/update/:id', requireAuth, contactController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/update/:id', requireAuth, contactController.processEditPage);

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);


module.exports = router;