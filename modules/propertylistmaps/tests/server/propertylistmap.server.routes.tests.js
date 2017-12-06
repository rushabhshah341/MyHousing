'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Propertylistmap = mongoose.model('Propertylistmap'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  propertylistmap;

/**
 * Propertylistmap routes tests
 */
describe('Propertylistmap CRUD tests', function () {

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

    // Save a user to the test db and create new Propertylistmap
    user.save(function () {
      propertylistmap = {
        name: 'Propertylistmap name'
      };

      done();
    });
  });

  it('should be able to save a Propertylistmap if logged in', function (done) {
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

        // Save a new Propertylistmap
        agent.post('/api/propertylistmaps')
          .send(propertylistmap)
          .expect(200)
          .end(function (propertylistmapSaveErr, propertylistmapSaveRes) {
            // Handle Propertylistmap save error
            if (propertylistmapSaveErr) {
              return done(propertylistmapSaveErr);
            }

            // Get a list of Propertylistmaps
            agent.get('/api/propertylistmaps')
              .end(function (propertylistmapsGetErr, propertylistmapsGetRes) {
                // Handle Propertylistmaps save error
                if (propertylistmapsGetErr) {
                  return done(propertylistmapsGetErr);
                }

                // Get Propertylistmaps list
                var propertylistmaps = propertylistmapsGetRes.body;

                // Set assertions
                (propertylistmaps[0].user._id).should.equal(userId);
                (propertylistmaps[0].name).should.match('Propertylistmap name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Propertylistmap if not logged in', function (done) {
    agent.post('/api/propertylistmaps')
      .send(propertylistmap)
      .expect(403)
      .end(function (propertylistmapSaveErr, propertylistmapSaveRes) {
        // Call the assertion callback
        done(propertylistmapSaveErr);
      });
  });

  it('should not be able to save an Propertylistmap if no name is provided', function (done) {
    // Invalidate name field
    propertylistmap.name = '';

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

        // Save a new Propertylistmap
        agent.post('/api/propertylistmaps')
          .send(propertylistmap)
          .expect(400)
          .end(function (propertylistmapSaveErr, propertylistmapSaveRes) {
            // Set message assertion
            (propertylistmapSaveRes.body.message).should.match('Please fill Propertylistmap name');

            // Handle Propertylistmap save error
            done(propertylistmapSaveErr);
          });
      });
  });

  it('should be able to update an Propertylistmap if signed in', function (done) {
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

        // Save a new Propertylistmap
        agent.post('/api/propertylistmaps')
          .send(propertylistmap)
          .expect(200)
          .end(function (propertylistmapSaveErr, propertylistmapSaveRes) {
            // Handle Propertylistmap save error
            if (propertylistmapSaveErr) {
              return done(propertylistmapSaveErr);
            }

            // Update Propertylistmap name
            propertylistmap.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Propertylistmap
            agent.put('/api/propertylistmaps/' + propertylistmapSaveRes.body._id)
              .send(propertylistmap)
              .expect(200)
              .end(function (propertylistmapUpdateErr, propertylistmapUpdateRes) {
                // Handle Propertylistmap update error
                if (propertylistmapUpdateErr) {
                  return done(propertylistmapUpdateErr);
                }

                // Set assertions
                (propertylistmapUpdateRes.body._id).should.equal(propertylistmapSaveRes.body._id);
                (propertylistmapUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Propertylistmaps if not signed in', function (done) {
    // Create new Propertylistmap model instance
    var propertylistmapObj = new Propertylistmap(propertylistmap);

    // Save the propertylistmap
    propertylistmapObj.save(function () {
      // Request Propertylistmaps
      request(app).get('/api/propertylistmaps')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Propertylistmap if not signed in', function (done) {
    // Create new Propertylistmap model instance
    var propertylistmapObj = new Propertylistmap(propertylistmap);

    // Save the Propertylistmap
    propertylistmapObj.save(function () {
      request(app).get('/api/propertylistmaps/' + propertylistmapObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', propertylistmap.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Propertylistmap with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/propertylistmaps/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Propertylistmap is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Propertylistmap which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Propertylistmap
    request(app).get('/api/propertylistmaps/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Propertylistmap with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Propertylistmap if signed in', function (done) {
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

        // Save a new Propertylistmap
        agent.post('/api/propertylistmaps')
          .send(propertylistmap)
          .expect(200)
          .end(function (propertylistmapSaveErr, propertylistmapSaveRes) {
            // Handle Propertylistmap save error
            if (propertylistmapSaveErr) {
              return done(propertylistmapSaveErr);
            }

            // Delete an existing Propertylistmap
            agent.delete('/api/propertylistmaps/' + propertylistmapSaveRes.body._id)
              .send(propertylistmap)
              .expect(200)
              .end(function (propertylistmapDeleteErr, propertylistmapDeleteRes) {
                // Handle propertylistmap error error
                if (propertylistmapDeleteErr) {
                  return done(propertylistmapDeleteErr);
                }

                // Set assertions
                (propertylistmapDeleteRes.body._id).should.equal(propertylistmapSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Propertylistmap if not signed in', function (done) {
    // Set Propertylistmap user
    propertylistmap.user = user;

    // Create new Propertylistmap model instance
    var propertylistmapObj = new Propertylistmap(propertylistmap);

    // Save the Propertylistmap
    propertylistmapObj.save(function () {
      // Try deleting Propertylistmap
      request(app).delete('/api/propertylistmaps/' + propertylistmapObj._id)
        .expect(403)
        .end(function (propertylistmapDeleteErr, propertylistmapDeleteRes) {
          // Set message assertion
          (propertylistmapDeleteRes.body.message).should.match('User is not authorized');

          // Handle Propertylistmap error error
          done(propertylistmapDeleteErr);
        });

    });
  });

  it('should be able to get a single Propertylistmap that has an orphaned user reference', function (done) {
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

          // Save a new Propertylistmap
          agent.post('/api/propertylistmaps')
            .send(propertylistmap)
            .expect(200)
            .end(function (propertylistmapSaveErr, propertylistmapSaveRes) {
              // Handle Propertylistmap save error
              if (propertylistmapSaveErr) {
                return done(propertylistmapSaveErr);
              }

              // Set assertions on new Propertylistmap
              (propertylistmapSaveRes.body.name).should.equal(propertylistmap.name);
              should.exist(propertylistmapSaveRes.body.user);
              should.equal(propertylistmapSaveRes.body.user._id, orphanId);

              // force the Propertylistmap to have an orphaned user reference
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

                    // Get the Propertylistmap
                    agent.get('/api/propertylistmaps/' + propertylistmapSaveRes.body._id)
                      .expect(200)
                      .end(function (propertylistmapInfoErr, propertylistmapInfoRes) {
                        // Handle Propertylistmap error
                        if (propertylistmapInfoErr) {
                          return done(propertylistmapInfoErr);
                        }

                        // Set assertions
                        (propertylistmapInfoRes.body._id).should.equal(propertylistmapSaveRes.body._id);
                        (propertylistmapInfoRes.body.name).should.equal(propertylistmap.name);
                        should.equal(propertylistmapInfoRes.body.user, undefined);

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
      Propertylistmap.remove().exec(done);
    });
  });
});
