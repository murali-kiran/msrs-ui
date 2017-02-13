/**
 * service layer to handle all employee related stuff.
 * this is used by empView.Controller.
 */
(function(){
    var app = angular.module("msrsApp");

    app.service("EmpService",function($http){
        var self = this;

        self.getEmpById = function(id){
            var promise1 = $http.get("http://localhost:8080/rest/getEmp?empid=" + id)
            var promise2 = promise1.then(function (response) {                
                return _updateEmpResponse(response.data); 

            }); 

            return promise2;
        }

        self.saveIncident = function(incident){
            var promise1 = $http.post("http://localhost:8080/rest/createIncident",incident);
            var promise2 = promise1.then(function (response) { 
                console.log(response.data);
                return response.data; 

            }); 
            return promise2;
        }
    });

    _updateEmpResponse = function (emp){

        emp.doj = new Date(emp.doj);                
        emp.dob = new Date(emp.dob);                
        emp.dor = new Date(emp.dor);                

        for(var incident in emp.incidents){            
            emp.incidents[incident].firstdayofincident = new Date(emp.incidents[incident].firstdayofincident);            
        }

        return emp;

    }


 

    

})();
