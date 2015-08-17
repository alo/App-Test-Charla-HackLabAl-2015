(function(){
  'use_strict';

    angular.module('app', [ ])

    .controller('controlador', controlador)
    .factory('SongsFactory', SongsFactory );

    controlador.$inject = ['$scope', 'SongsFactory', '$timeout'];
    function controlador($scope, SongsFactory, $timeout){

      $scope.cargando = false;

      $scope.setSelected = function(song){
        $scope.selectedSong = song;
      }      

      $scope.cargarListado = function(genero){
        $scope.listado = {};

        // Variable semáforo para mostrar el spinner
        $scope.cargando = true;

        // Usamos $timeout para que se aprecie el spinner
        $timeout(function(){

          // Usamos el servicio "SongsFactory" para comunicarnos con la API
           SongsFactory.getList(genero)
            .success(function(res){
              $scope.listado = res.feed.entry;
            })
            .error(function(e){
              console.error('Error al cargar el listado:', e);
            })
            .then(function(){
              $scope.cargando = false;
            })  
        }, 1000);
      }

      // Género inicial de pruebas y lstado de géneros de ejemplo
      $scope.genero = 50000063;
      $scope.generos = [
        {id: 21, name: 'Rock'},
        {id: 20, name: 'Alternativa'},
        {id: 24, name: 'Reggae'},
        {id: 50000063, name: 'Disney'}
      ];

    }


    // Servicio para conectarnos con los servicios web
    SongsFactory.$inject = ['$http'];
    function SongsFactory($http){

      return {
        getZen:function(user){
          return $http.get('https://api.github.com/zen');
        },
        getList:function(genero){
          return $http.get('https://itunes.apple.com/es/rss/topsongs/limit=50/genre='+genero+'/json');
        }
      }

    }



})();
