'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Allpackage = mongoose.model('Allpackage'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  allpackage;

/**
 * Allpackage routes tests
 */
describe('Allpackage CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Allpackage
    user.save(function () {
      allpackage = {
        name: 'Allpackage name'
      };

      done();
    });
  });

  it('should be able to save a Allpackage if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Allpackage
        agent.post('/api/allpackages')
          .send(allpackage)
          .expect(200)
          .end(function (allpackageSaveErr, allpackageSaveRes) {
            // Handle Allpackage save error
            if (allpackageSaveErr) {
              return done(allpackageSaveErr);
            }

            // Get a list of Allpackages
            agent.get('/api/allpackages')
              .end(function (allpackagesGetErr, allpackagesGetRes) {
                // Handle Allpackages save error
                if (allpackagesGetErr) {
                  return done(allpackagesGetErr);
                }

                // Get Allpackages list
                var allpackages = allpackagesGetRes.body;

                // Set assertions
                (allpackages[0].user._id).should.equal(userId);
                (allpackages[0].name).should.match('Allpackage name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Allpackage if not logged in', function (done) {
    agent.post('/api/allpackages')
      .send(allpackage)
      .expect(403)
      .end(function (allpackageSaveErr, allpackageSaveRes) {
        // Call the assertion callback
        done(allpackageSaveErr);
      });
  });

  it('should not be able to save an Allpackage if no name is provided', function (done) {
    // Invalidate name field
    allpackage.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Allpackage
        agent.post('/api/allpackages')
          .send(allpackage)
          .expect(400)
          .end(function (allpackageSaveErr, allpackageSaveRes) {
            // Set message assertion
            (allpackageSaveRes.body.message).should.match('Please fill Allpackage name');

            // Handle Allpackage save error
            done(allpackageSaveErr);
          });
      });
  });

  it('should be able to update an Allpackage if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Allpackage
        agent.post('/api/allpackages')
          .send(allpackage)
          .expect(200)
          .end(function (allpackageSaveErr, allpackageSaveRes) {
            // Handle Allpackage save error
            if (allpackageSaveErr) {
              return done(allpackageSaveErr);
            }

            // Update Allpackage name
            allpackage.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Allpackage
            agent.put('/api/allpackages/' + allpackageSaveRes.body._id)
              .send(allpackage)
              .expect(200)
              .end(function (allpackageUpdateErr, allpackageUpdateRes) {
                // Handle Allpackage update error
                if (allpackageUpdateErr) {
                  return done(allpackageUpdateErr);
                }

                // Set assertions
                (allpackageUpdateRes.body._id).should.equal(allpackageSaveRes.body._id);
                (allpackageUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Allpackages if not signed in', function (done) {
    // Create new Allpackage model instance
    var allpackageObj = new Allpackage(allpackage);

    // Save the allpackage
    allpackageObj.save(function () {
      // Request Allpackages
      request(app).get('/api/allpackages')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Allpackage if not signed in', function (done) {
    // Create new Allpackage model instance
    var allpackageObj = new Allpackage(allpackage);

    // Save the Allpackage
    allpackageObj.save(function () {
      request(app).get('/api/allpackages/' + allpackageObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', allpackage.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Allpackage with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/allpackages/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Allpackage is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Allpackage which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Allpackage
    request(app).get('/api/allpackages/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Allpackage with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Allpackage if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Allpackage
        agent.post('/api/allpackages')
          .send(allpackage)
          .expect(200)
          .end(function (allpackageSaveErr, allpackageSaveRes) {
            // Handle Allpackage save error
            if (allpackageSaveErr) {
              return done(allpackageSaveErr);
            }

            // Delete an existing Allpackage
            agent.delete('/api/allpackages/' + allpackageSaveRes.body._id)
              .send(allpackage)
              .expect(200)
              .end(function (allpackageDeleteErr, allpackageDeleteRes) {
                // Handle allpackage error error
                if (allpackageDeleteErr) {
                  return done(allpackageDeleteErr);
                }

                // Set assertions
                (allpackageDeleteRes.body._id).should.equal(allpackageSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Allpackage if not signed in', function (done) {
    // Set Allpackage user
    allpackage.user = user;

    // Create new Allpackage model instance
    var allpackageObj = new Allpackage(allpackage);

    // Save the Allpackage
    allpackageObj.save(function () {
      // Try deleting Allpackage
      request(app).delete('/api/allpackages/' + allpackageObj._id)
        .expect(403)
        .end(function (allpackageDeleteErr, allpackageDeleteRes) {
          // Set message assertion
          (allpackageDeleteRes.body.message).should.match('User is not authorized');

          // Handle Allpackage error error
          done(allpackageDeleteErr);
        });

    });
  });

  it('should be able to get a single Allpackage that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Allpackage
          agent.post('/api/allpackages')
            .send(allpackage)
            .expect(200)
            .end(function (allpackageSaveErr, allpackageSaveRes) {
              // Handle Allpackage save error
              if (allpackageSaveErr) {
                return done(allpackageSaveErr);
              }

              // Set assertions on new Allpackage
              (allpackageSaveRes.body.name).should.equal(allpackage.name);
              should.exist(allpackageSaveRes.body.user);
              should.equal(allpackageSaveRes.body.user._id, orphanId);

              // force the Allpackage to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Allpackage
                    agent.get('/api/allpackages/' + allpackageSaveRes.body._id)
                      .expect(200)
                      .end(function (allpackageInfoErr, allpackageInfoRes) {
                        // Handle Allpackage error
                        if (allpackageInfoErr) {
                          return done(allpackageInfoErr);
                        }

                        // Set assertions
                        (allpackageInfoRes.body._id).should.equal(allpackageSaveRes.body._id);
                        (allpackageInfoRes.body.name).should.equal(allpackage.name);
                        should.equal(allpackageInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Allpackage.remove().exec(done);
    });
  });
});
