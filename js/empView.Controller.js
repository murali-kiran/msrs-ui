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
        this.showIncidentForm = function (status,empId){
            this.showAddIncidentForm = status;

            if(status){

                var newIncident = 
                {                      
                    details: "",
                    empid: empId,
                    firstdayofincident: new Date(),
                    ishomevisitrequired: 0,                
                
                    benefitType: {
                        benefittypeid: 1,
                    },
                    officeLocation1: {
                        officelocationid: 1,
                    },
                    officeLocation2: {
                        officelocationid: 1,
                    }
                };

            self.newIncidentModel = newIncident;

            _fetchAllOfficeLocationsAndBenefitType();
            }
            else{
                self.newIncidentModel= {};
            }

    /*
    {
      "incidentid": 1,
      "createdtime": 1486751400000,
      "details": "head ache",
      "empid": 1,
      "firstdayofincident": "2016-12-12",
      "ishomevisitrequired": 1,
      "modifiedtime": 1486751400000,
      "benefitType": {
        "benefittypeid": 1,
        "benefittype": "Fever",
        "createdtime": 1486303194000,
        "modifiedtime": 1486303194000
      },
      "officeLocation1": {
        "officelocationid": 1,
        "createdtime": 1486303133000,
        "modifiedtime": 1486303133000,
        "officelocation": "mehdipatnam"
      },
      "officeLocation2": {
        "officelocationid": 2,
        "createdtime": 1486303144000,
        "modifiedtime": 1486303144000,
        "officelocation": "hitechcity"
      }
    }
    
    */

    }

        /**
         * save the newly created incident of employee
         */
        this.saveIncident = function(incident){
            
            incident.ishomevisitrequired = incident.ishomevisitrequired ? 1 : 0 ;
            incident.createdtime = new Date();
            EmpService.saveIncident(incident).then(function(response){
                self.showIncidentForm(false);

            EmpService.getEmpById(incident.empid).then(function(response){
                self.currentEmp = response;                                  
            });

            });

        }

        /**
         * Edit the incident of employee
         *  */        
        this.editIncidentOfEmp = function(incident,editStatus){
            if(editStatus == "edit"){
                incident.edit=true;

                angular.copy(incident, _temp);
                _fetchAllOfficeLocationsAndBenefitType();

            }else if(editStatus == "save"){
                
                EmpService.saveIncident(incident).then(function(response) {                    
                });

                incident.edit=false;
                _temp = {};
            }else if(editStatus == "cancel"){                                
                angular.copy(_temp,incident);
                incident.edit=false;
                _temp = {};
            }
        }  

        /**
         * private method to fetch all office locations and
         * benefits
         */
        _fetchAllOfficeLocationsAndBenefitType = function ()      {

                if(self.empBenefitTypes == null || self.empBenefitTypes.length == 0){
                    CommonService.getAllBenefitType().then(function(response){
                    self.empBenefitTypes = response;  
                    });
                }

                if(self.empOffice1_Locs == null || self.empOffice1_Locs.length == 0){
                    CommonService.getAllOffice_Locs().then(function(response){
                    self.empOffice1_Locs = response;  
                    });
                }

                if(self.empOffice2_Locs == null || self.empOffice2_Locs.length == 0){
                    CommonService.getAllOffice_Locs().then(function(response){
                    self.empOffice2_Locs = response;  
                    });
                }

        }
    }
})();
