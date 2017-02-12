(function(){
    var app = angular.module("msrsApp");

    app.service("EmpService",function($http){
        var self = this;

        self.getEmpById = function(id){
            var promise1 = $http.get("http://localhost:8080/rest/getEmp?empid=" + id)
            var promise2 = promise1.then(function (response) {                
                return response.data;                  
            }); 

            return promise2;
        }
    });

 

    

})();
