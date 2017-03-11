/**
 * this is the controller for left side nav of the application
 */
(function () {

    var app = angular.module("msrsApp");
    app.controller("leftNavController", leftNavController);

    function leftNavController($scope,$http, $rootScope , globalInfo ) {
        self = this;

        this.showComponent = function (viewName) {

            if(viewName == "createEmpView"){
                // to invoke create emp view page
                globalInfo.currentViewComponent = "createEmpView";                            
                $rootScope.$emit('showCreateEmp');  
            }
            else if(viewName == "home"){
                // to invoke home page
                globalInfo.currentViewComponent = viewName;                            
            }
        }
    }

})();    