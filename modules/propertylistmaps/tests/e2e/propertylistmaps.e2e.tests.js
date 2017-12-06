'use strict';

describe('Propertylistmaps E2E Tests:', function () {
  describe('Test Propertylistmaps page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/propertylistmaps');
      expect(element.all(by.repeater('propertylistmap in propertylistmaps')).count()).toEqual(0);
    });
  });
});
