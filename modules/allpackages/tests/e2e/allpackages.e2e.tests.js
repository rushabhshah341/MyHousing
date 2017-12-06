'use strict';

describe('Allpackages E2E Tests:', function () {
  describe('Test Allpackages page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/allpackages');
      expect(element.all(by.repeater('allpackage in allpackages')).count()).toEqual(0);
    });
  });
});
