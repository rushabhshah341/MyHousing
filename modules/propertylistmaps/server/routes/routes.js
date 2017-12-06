// Dependencies
var mongoose        = require('mongoose');
var User            = require('../models/model.js');


// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){
        console.log("In get server side");

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){
        console.log("In Post server side");

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);
        console.log(newuser);
        // New User is saved in the db.
        newuser.save(function(err){
            if(err)
                console.log("errrorr");
                return res.send(err);

            // If no errors are found, it responds with a JSON of the new user
             res.json(req.body);
        });
    });
    app.post('/query', function(req, res) {

        console.log("In query server side");
        var distance = req.body.distance;
        var lat = req.body.latitude;
        var long = req.body.longitude;
      var noofbedroom = req.body.noofbedroom;
      var price= req.body.price;

        console.log(lat, long,distance);
        var query = User.find({});

        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

            // Converting meters to miles. Specifying spherical geometry (for globe)
            maxDistance: distance * 1609.34, spherical: true});

      if(noofbedroom){
        query = query.where('noofbedroom').gte(noofbedroom);
      }
      if(price){
        query = query.where('price').gte(price);
      }

      console.log(query);
        //
        query.exec(function (err, users) {
            if(err)
                res.send(err);
            else
            // If no errors, respond with a JSON of all users that meet the criteria
                res.json(users);
        })

    });
};
