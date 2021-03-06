// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');           // call express
var app = express();                        // define our app using express

var cors = require('cors');                 // enable CORS requests
app.use(cors());


// load translations
var translations = {};
translations.ca = require('./i18n/ca');
translations.es = require('./i18n/es');
var viewTranslations = {};
viewTranslations.ca = {
    'init': require('./i18n/ca.init'),
    'test': require('./i18n/ca.test')
};
viewTranslations.es = {
    'init': require('./i18n/es.init'),
    'test': require('./i18n/es.test')
};

var port = process.env.PORT || 8080;        // set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our Translation api!' });   
});

// on routes that end in /translations
// ----------------------------------------------------
router.route('/translations')

    // get the translations by query params, Catalan by default (accessed at GET http://localhost:8080/api/translations?view=...&locale=...)
    .get(function(req, res) {
        if (req.query && req.query.locale) {
            if (req.query.view) {
                res.json(viewTranslations[req.query.locale][req.query.view]);
            } else {
                res.json(translations[req.query.locale]);
            }
        } else {
            // default translation
            res.json(translations.ca);
        }
    });

// on routes that end in /translations/:language_code
// ----------------------------------------------------
router.route('/translations/:language_code')

    // get the pokemon with that id (accessed at GET http://localhost:8080/api/translations/:language_code)
    .get(function(req, res) {
        var translationFound = translations[req.params.language_code]
        if (translationFound) {
            res.json(translationFound);
        } else {
            res.status(404).send('Language not found!');
        }
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('You can access the available translations on port ' + port);