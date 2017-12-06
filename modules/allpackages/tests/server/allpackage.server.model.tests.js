'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Allpackage = mongoose.model('Allpackage');

/**
 * Globals
 */
var user,
  allpackage;

/**
 * Unit tests
 */
describe('Allpackage Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      allpackage = new Allpackage({
        name: 'Allpackage Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return allpackage.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      allpackage.name = '';

      return allpackage.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Allpackage.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
