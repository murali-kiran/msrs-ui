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
         * watcing which component is to show in SPA
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
         * event listening to showCreateEmp event fired in home controller to 
         * show create emp details
         */
        $rootScope.$on('showCreateEmp', function(event) {

           var createEmpModel = {
                                 aatharnumber:"",
                                 adress1:"",
                                 adress2:"",
                                 createdtime: new Date(),
                                 district:"",
                                 dob: new Date(),
                                 doj: new Date(),
                                 dor: new Date(),
                                 email:"",
                                 firstname:"",
                                 gender:0,
                                 lastname:"",
                                 modifiedtime:new Date(),
                                 pancard:"",
                                 phone:"",
                                 pincode:"",
                                 state:"",
                                 nominees:[],
                                 incidents:[]
                                };

            self.createEmpModel = createEmpModel;
        });


        /**
         * Saving emp details
         */
        this.saveEmp = function(status){

            if(status == "save"){
                EmpService.saveEmployee(self.createEmpModel).then(function(response){
                    console.log(response);
                    self.saveEmp("cancel");
                });                
            }
            else if(status == "reset"){
                $rootScope.$emit('showCreateEmp');
            }
            else if(status == "cancel"){
                $rootScope.$emit('showCreateEmp');
                this.goBack('home');
            }
        }


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

            // status is true to show new incident  form
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
            // status is false to cancel new incident form
            else{
                self.newIncidentModel= {};
            }

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
                _fetchAllOfficeLocationsAndBenefitType(); 
            }else if(editStatus == "save"){                
                EmpService.saveIncident(incident).then(function(response) {                    
                });
                incident.edit=false;
            }else if(editStatus == "cancel"){   
                incident.edit=false;
            }
        }  

        this.editNomineeOfEmp = function(nominee,editStatus){
            if(editStatus == "edit"){
                nominee.edit=true;                
            }else if(editStatus == "save"){                
                EmpService.saveNominee(nominee).then(function(response) {                    
                });
                nominee.edit=false;
            }else if(editStatus == "cancel"){   
                nominee.edit=false;
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
