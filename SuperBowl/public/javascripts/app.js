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