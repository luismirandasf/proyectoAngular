angular.module('taskManagerApp')
  .directive('naElementoUsuario', function(){
    return {
      restrict: 'E',
      templateUrl: '/templates/directives/na-elemento-usuario.html',
      scope: {
        nombre: '=',
        email: '='
      },
      controller: function($scope){
        //$scope.cabecera = 'Título común';
      },
      link: function(scope, element, attrs){
        element.on("click", function(){
        element.find("p").toggleClass('hidden');
      });
      
      }
    };
  });