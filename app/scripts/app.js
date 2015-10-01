var myAppModule = angular.module('blocJams', ['ui.router']);

myAppModule.config(function($stateProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider.state('landing', {
    url: '/landing',
    // controller: 'Album.controller',
    templateUrl: '/templates/landing.html'
  });

  $stateProvider.state('album', {
    url: '/album',
    // controller: 'Album.controller',
    templateUrl: 'templates/album.html'
  });

  $stateProvider.state('collection', {
    url: '/collection',
    // controller: 'Album.controller',
    templateUrl: 'templates/collection.html'
  });
});
