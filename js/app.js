var app = angular.module("msrsApp", []);

app.factory("globalInfo", function () {
    return { currentViewComponent: "home" };
});
 
