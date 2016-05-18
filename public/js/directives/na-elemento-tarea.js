angular.module('taskManagerApp')
  .directive('naElementoTarea', function(){
    return {
      restrict: 'E',
      templateUrl: '/templates/directives/na-elemento-tarea.html',
      scope: {
        titulo: '=',
        descripcion: '=',
        fecha: '=',
        image: '=',
        caducada: '=',
        id: '=',
        borrada: '=',
        email: '='
      },
      controller: function($scope, tarea, $window){

        $scope.cambiarCaducidad = function() {
          var tareaCaducada = {_id: $scope.id, caducada: true};
          console.log(tareaCaducada);
          this.tarea = {};
          $scope.tarea = new tarea();//////////////resource
          console.log($scope);
          $scope.tarea.$save(tareaCaducada)
          $scope.caducada = true;
        };

        $scope.eliminarNota = function() {
          //console.log($scope.borrada);
          var borrarTarea = {_id: $scope.id, borrar: true, email: $scope.email};
          console.log(borrarTarea);
          this.tarea = {};
          $scope.tarea = new tarea();//////////////resource
          //console.log($scope);
          $scope.tarea.$save(borrarTarea)
          $scope.borrada = true;
        };

        $scope.editarTarea = function(){
          console.log($scope.id);
          // editar tarea esta dentro de na-elemento-tarea y esto es un $scope diferente al de otras tareas por 
          // lo tanto diferenciamos los id's
          $window.location.href="#/tareas/"+$scope.id;

        };

        //$scope.loadData();
      },
      link: function(scope, element, attrs){
        element.on("click", function(){
        element.find(".informacion").toggleClass('hidden');

        });
        /*$(".completedTaskBtn").on("click",function(){

          console.log("HOLA");
        });*/
      }
    };
  });
