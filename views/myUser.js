var app = angular.module("myApp", ["ngRoute"]);
app.filter('searchFor', function(){
	return function(users, searchString){
		if(!searchString){
			return users;
		}

		var result = [];
		angular.forEach(users, function(user){
			if(user.fName.toLowerCase() == searchString.toLowerCase() ||
				 user.lName.toLowerCase() == searchString.toLowerCase() ||
				 user.sex.toLowerCase() == searchString.toLowerCase() ||
				 user.age == searchString ||
				 user.title.toLowerCase() == searchString.toLowerCase()) {
				result.push(user);
			}
		});

		return result;
	};
});
app.factory('userService', function($http) {
	var usersObj = {};
	usersObj.query = function() {
		return $http.get('/users');
	}

	usersObj.create = function(newuser) {
		return $http.post('/users', newuser);
	}

	usersObj.get = function(id) {
		return $http.get('/users/' + id);
	}

	usersObj.update = function(updatedUser) {
		return $http.put('/users/' + updatedUser._id, updatedUser);
	}

	usersObj.delete = function(id) {
		return $http.delete('/users/' + id);
	}
	return usersObj;
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "userList.html",
        controller : "userListCtrl"
    })
    .when("/newUser", {
        templateUrl : "newUser.html",
        controller : "newUserCtrl"
    })
    .when("/editUser/:_id", {
    	templateUrl : "editUser.html",
    	controller : "editUserCtrl"
    })
    .otherwise({
      redirectTo: '/userList.html'
    });
});

app.controller('userListCtrl', function ($scope, userService, $route) {
	userService.query().success(function(data) {
		$scope.users = data;
	});

	$scope.deleteUser = function(id) {
		userService.delete(id).success(function(data) {
			$scope.users = data;
				userService.query().success(function(data) {
		$scope.users = data;
	});
		});
	}
	
	$scope.curPage = 0;
	$scope.pageSize = 5;
	$scope.numberOfPages = function() {
	  return Math.ceil($scope.users.length / $scope.pageSize);
	};
	$scope.orderByMe = function(item) {
	  $scope.myOrderBy = item;
	}
});

angular.module('myApp').filter('pagination', function() {
	return function(input, start) {
		start = +start;
		return input.slice(start);
	};
});

app.controller("newUserCtrl", function ($scope, userService, $route) {
	$scope.saveChanges = function() {
		userService.create($scope.newuser);
		$route.reload();
	}
});

app.controller("editUserCtrl", function ($scope, userService, $routeParams, $route) {
	userService.get($routeParams._id).success(function(data) {
		$scope.newuser = data;
	});

	$scope.saveChanges = function() {
		userService.update($scope.newuser);
		$route.reload();
	}
});
