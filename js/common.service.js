/**
 * service layer have all common methods which 
 * are usefull in all the controller
 */
(function(){
    var app = angular.module("msrsApp");

    app.service("CommonService",function($http){
        var self = this;

        self.getAllBenefitType = function(){
            return $http.get("http://localhost:8080/rest/getAllBenefitType").then(function (response) {                
                return response.data;                  
            }); 
        }

        self.getAllOffice_Locs = function(){
            return $http.get("http://localhost:8080/rest/getAllOfficeLocation").then(function (response) {                
                return response.data;                  
            });
        }

    });
})();