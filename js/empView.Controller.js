/**
 *  controller to handle employee related stuff
 */
(function () {
    var app = angular.module("msrsApp");
    app.controller("empDetailsController", empDetailsController);

    function empDetailsController($scope,$http,$rootScope,globalInfo,EmpService,CommonService) {
     
        var self = this;

        /**
         * private variable for temporary use
         */
        var _temp = {};

        /**
         * watcing which component is showing in SPA
         */
        $scope.$watch(function(scope) { return globalInfo.currentViewComponent },
              function(newValue, oldValue) {                 
                  self.currentView = newValue;
              }
        );

        /**
         * event listening to view event fired in home controller to show 
         * empDetails
         */
        $rootScope.$on('showEmp', function(event, empObj) {

            return EmpService.getEmpById(empObj.empId).then(function(response){
                self.currentEmp = response;                                  
            });

        });

        /**
         * back to home page from empdetails page
         */
        this.goBack = function (page) {            
            globalInfo.currentViewComponent = page;                
        }

        /**
         *  show add incident form 
         * */
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

        /**
         * save the newly created incident of employee
         */
        this.saveIncident = function(incident){
            EmpService.saveIncident(incident).then(function(response){
                console.log("in"+response);
            });
        }

        /**
         * Edit the incident of employee
         *  */        
        this.editIncidentOfEmp = function(incident,editStatus){
            if(editStatus == "edit"){
                incident.edit=true;

                angular.copy(incident, _temp);

                if(self.empBenefitTypes == null || self.empBenefitTypes.length == 0){
                    CommonService.getAllBenefitType().then(function(response){
                    self.empBenefitTypes = response;  
                        console.log("all benefits : "+self.empBenefitTypes.length);                               
                    });
                }
            }else if(editStatus == "save"){
                
                EmpService.saveIncident(incident).then(function(response){
                    console.log("In Emp controller update incident : "+response);
                });

                incident.edit=false;
                _temp = {};
            }else if(editStatus == "cancel"){                                
                angular.copy(_temp,incident);
                incident.edit=false;
                _temp = {};
            }
        }        
    }
})();
