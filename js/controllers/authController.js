function AuthCtrl($scope, $location, $route, toaster, Auth) {
    $scope.$route = $route;

    $scope.register = function(user) {
        Auth.register(user)
            .then(function() {
                toaster.pop('success', "Registered successfully");
                $location.path('/events');
            }, function(err) {
                errMessage(err);
            });
    };

    $scope.login = function(user) {
        Auth.login(user)
            .then(function() {
                toaster.pop('success', "Logged in successfully");
                $location.path('/events');
            }, function(err) {
                errMessage(err);
            });
    };

    $scope.changePassword = function(user) {
        Auth.changePassword(user)
            .then(function() {

                // Reset form
                $scope.email = '';
                $scope.oldPass = '';
                $scope.newPass = '';

                toaster.pop('success', "Password changed successfully");
            }, function(err) {
                errMessage(err);
            });
    };

    $scope.logout = function() {
        Auth.logout();
        toaster.pop('success', "Logged out successfully");
        $location.path('login');
    };

    function errMessage(err) {

        var msg = "Unknown Error...";

        if (err && err.code) {
            switch (err.code) {
                case "EMAIL_TAKEN":
                    msg = "This email has been taken";
                    break;
                case "INVALID_EMAIL":
                    msg = "Invalid email";
                    break;
                case "NETWORK_ERROR":
                    msg = "Network error";
                    break;
                case "INVALID_PASSWORD":
                    msg = "Invalid password";
                    break;
                case "INVALID_USER":
                    msg = "Invalid user";
                    break;
            }
        }

        toaster.pop('error', msg);
    };
}



angular
    .module('eventsBoard')
    .controller('AuthCtrl', AuthCtrl)
