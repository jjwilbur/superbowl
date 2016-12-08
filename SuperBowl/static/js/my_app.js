angular.module('myApp', []).
  controller('myController', ['$scope', '$http', 
                              function($scope, $http) {
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
  }]);

angular.module('superbowl', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope, $http){
    $scope.teams = [];
    $scope.vote = function(team) {
      return $http.put('/teams/' + team._id + '/vote')
        .success(function(data){
          console.log("vote worked");
          team.votes = data.votes;
        });
    };
    $scope.incrementVotes = function(team) {
      $scope.vote(team);
    };
    $scope.getAll = function() {
      return $http.get('/teams').success(function(data){
        angular.copy(data, $scope.teams);
      });
    };
    $scope.getAll();
  }
]);