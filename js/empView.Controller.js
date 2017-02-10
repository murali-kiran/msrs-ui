(function () {
    var app = angular.module("msrsApp");
    app.controller("empDetailsController", empDetailsController);

    function empDetailsController($scope,$http,$rootScope,globalInfo) {
     
        var self = this;

        $scope.$watch(function(scope) { return globalInfo.currentViewComponent },
              function(newValue, oldValue) {                 
                  self.currentView = newValue;
              }
        );


        $rootScope.$on('showEmp', function(event, empObj) {

            console.log("empObj is : "+empObj.empId);

            return $http.get("http://localhost:8080/rest/getEmp?empid=" + empObj.empId).then(function (response) {                
                self.currentEmp = response.data;                
            }); 

        });


        this.goBack = function (page) {
            console.log("I am in gotBack : "+page);
            globalInfo.currentViewComponent = page;                
        }

        

        

    }
})();
