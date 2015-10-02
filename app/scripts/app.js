angular.module('blocJams', ['ui.router']);

angular.module('blocJams').config(function($stateProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider.state('landing', {
    url: '/landing',
    controller: 'Landing.controller',
    templateUrl: '/templates/landing.html'
  });

  $stateProvider.state('album', {
    url: '/album',
    controller: 'Album.controller',
    templateUrl: 'templates/album.html'
  });

  $stateProvider.state('collection', {
    url: '/collection',
    controller: 'Collection.controller',
    templateUrl: 'templates/collection.html'
  });
});
