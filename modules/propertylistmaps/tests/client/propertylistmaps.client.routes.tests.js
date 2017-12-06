(function () {
  'use strict';

  describe('Propertylistmaps Route Tests', function () {
    // Initialize global variables
    var $scope,
      PropertylistmapsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PropertylistmapsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PropertylistmapsService = _PropertylistmapsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('propertylistmaps');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/propertylistmaps');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PropertylistmapsController,
          mockPropertylistmap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('propertylistmaps.view');
          $templateCache.put('modules/propertylistmaps/client/views/view-propertylistmap.client.view.html', '');

          // create mock Propertylistmap
          mockPropertylistmap = new PropertylistmapsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Propertylistmap Name'
          });

          // Initialize Controller
          PropertylistmapsController = $controller('PropertylistmapsController as vm', {
            $scope: $scope,
            propertylistmapResolve: mockPropertylistmap
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:propertylistmapId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.propertylistmapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            propertylistmapId: 1
          })).toEqual('/propertylistmaps/1');
        }));

        it('should attach an Propertylistmap to the controller scope', function () {
          expect($scope.vm.propertylistmap._id).toBe(mockPropertylistmap._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/propertylistmaps/client/views/view-propertylistmap.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PropertylistmapsController,
          mockPropertylistmap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('propertylistmaps.create');
          $templateCache.put('modules/propertylistmaps/client/views/form-propertylistmap.client.view.html', '');

          // create mock Propertylistmap
          mockPropertylistmap = new PropertylistmapsService();

          // Initialize Controller
          PropertylistmapsController = $controller('PropertylistmapsController as vm', {
            $scope: $scope,
            propertylistmapResolve: mockPropertylistmap
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.propertylistmapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/propertylistmaps/create');
        }));

        it('should attach an Propertylistmap to the controller scope', function () {
          expect($scope.vm.propertylistmap._id).toBe(mockPropertylistmap._id);
          expect($scope.vm.propertylistmap._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/propertylistmaps/client/views/form-propertylistmap.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PropertylistmapsController,
          mockPropertylistmap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('propertylistmaps.edit');
          $templateCache.put('modules/propertylistmaps/client/views/form-propertylistmap.client.view.html', '');

          // create mock Propertylistmap
          mockPropertylistmap = new PropertylistmapsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Propertylistmap Name'
          });

          // Initialize Controller
          PropertylistmapsController = $controller('PropertylistmapsController as vm', {
            $scope: $scope,
            propertylistmapResolve: mockPropertylistmap
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:propertylistmapId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.propertylistmapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            propertylistmapId: 1
          })).toEqual('/propertylistmaps/1/edit');
        }));

        it('should attach an Propertylistmap to the controller scope', function () {
          expect($scope.vm.propertylistmap._id).toBe(mockPropertylistmap._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/propertylistmaps/client/views/form-propertylistmap.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
