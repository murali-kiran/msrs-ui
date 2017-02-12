(function () {
    var app = angular.module("msrsApp");
    app.controller("empDetailsController", empDetailsController);

    function empDetailsController($scope,$http,$rootScope,globalInfo,EmpService,CommonService) {
     
        var self = this;

        // watcing which component is showing in SPA
        $scope.$watch(function(scope) { return globalInfo.currentViewComponent },
              function(newValue, oldValue) {                 
                  self.currentView = newValue;
              }
        );

        // event listening to show event fired in home controller
        $rootScope.$on('showEmp', function(event, empObj) {

            console.log("empObj is : "+empObj.empId);

        /*    return $http.get("http://localhost:8080/rest/getEmp?empid=" + empObj.empId).then(function (response) {                
                self.currentEmp = response.data;                  
                self.currentEmp.doj = new Date(self.currentEmp.doj);                
                self.currentEmp.dob = new Date(self.currentEmp.dob);                
                self.currentEmp.dor = new Date(self.currentEmp.dor);                
            }); 
            */

            return EmpService.getEmpById(empObj.empId).then(function(response){
                self.currentEmp = response;                  
                self.currentEmp.doj = new Date(self.currentEmp.doj);                
                self.currentEmp.dob = new Date(self.currentEmp.dob);                
                self.currentEmp.dor = new Date(self.currentEmp.dor);                
            });

        });

        // back to home page
        this.goBack = function (page) {            
            globalInfo.currentViewComponent = page;                
        }

        // show add incident form 
        this.showIncidentForm = function (status){
            this.showAddIncidentForm = status;

            console.log("all benefits : "+(status == true));                               

            if(status && (self.empBenefitTypes == null || self.empBenefitTypes.length == 0)) {
                CommonService.getAllBenefitType().then(function(response){
                self.empBenefitTypes = response;  
                    console.log("all benefits : "+self.empBenefitTypes.length);                               
                });
            }
        }

        this.saveIncident = function(empId){

        }
        
    }
})();
