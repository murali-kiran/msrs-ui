(function () {

    var app = angular.module("msrsApp");
    app.controller("msrsHomeController", msrsHomeController);

    function msrsHomeController($scope,$http, $rootScope , globalInfo ) {
        self = this;

        this.currentView =  globalInfo.currentViewComponent;
        this.count = 0;
        this.emps = [];

        this.myFunction = function () {
            return $http.get("http://localhost:8080/rest/all").then(function (response) {                
                self.emps = response.data;
            });
        }

        this.findById = function (id) {

            // to invoke empview page
            globalInfo.currentViewComponent = "empView";                
            $rootScope.$emit('showEmp', {empId: id});  
            
        }

        $scope.$watch(function(scope) { return globalInfo.currentViewComponent },
              function(newValue, oldValue) {                  
                  self.currentView = newValue;
              }
        );


    }

})();