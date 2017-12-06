(function () {
  'use strict';

  describe('Allpackages Route Tests', function () {
    // Initialize global variables
    var $scope,
      AllpackagesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AllpackagesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AllpackagesService = _AllpackagesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('allpackages');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/allpackages');
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
          AllpackagesController,
          mockAllpackage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('allpackages.view');
          $templateCache.put('modules/allpackages/client/views/view-allpackage.client.view.html', '');

          // create mock Allpackage
          mockAllpackage = new AllpackagesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Allpackage Name'
          });

          // Initialize Controller
          AllpackagesController = $controller('AllpackagesController as vm', {
            $scope: $scope,
            allpackageResolve: mockAllpackage
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:allpackageId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.allpackageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            allpackageId: 1
          })).toEqual('/allpackages/1');
        }));

        it('should attach an Allpackage to the controller scope', function () {
          expect($scope.vm.allpackage._id).toBe(mockAllpackage._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/allpackages/client/views/view-allpackage.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AllpackagesController,
          mockAllpackage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('allpackages.create');
          $templateCache.put('modules/allpackages/client/views/form-allpackage.client.view.html', '');

          // create mock Allpackage
          mockAllpackage = new AllpackagesService();

          // Initialize Controller
          AllpackagesController = $controller('AllpackagesController as vm', {
            $scope: $scope,
            allpackageResolve: mockAllpackage
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.allpackageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/allpackages/create');
        }));

        it('should attach an Allpackage to the controller scope', function () {
          expect($scope.vm.allpackage._id).toBe(mockAllpackage._id);
          expect($scope.vm.allpackage._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/allpackages/client/views/form-allpackage.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AllpackagesController,
          mockAllpackage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('allpackages.edit');
          $templateCache.put('modules/allpackages/client/views/form-allpackage.client.view.html', '');

          // create mock Allpackage
          mockAllpackage = new AllpackagesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Allpackage Name'
          });

          // Initialize Controller
          AllpackagesController = $controller('AllpackagesController as vm', {
            $scope: $scope,
            allpackageResolve: mockAllpackage
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:allpackageId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.allpackageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            allpackageId: 1
          })).toEqual('/allpackages/1/edit');
        }));

        it('should attach an Allpackage to the controller scope', function () {
          expect($scope.vm.allpackage._id).toBe(mockAllpackage._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/allpackages/client/views/form-allpackage.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
