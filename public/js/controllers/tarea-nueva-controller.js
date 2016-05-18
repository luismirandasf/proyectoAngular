

angular.module('taskManagerApp')
.controller('tareaNuevaController', function($scope, tarea, $window) {
  this.tarea = {};
  $scope.tarea = new tarea();//////////////resource
  this.guardaNuevatarea = function() {

 
     $('#atras-button').removeClass("btn-default");
     $('#atras-button').addClass("btn-primary");


    console.log(this.tarea);
    var controller = this;
    controller.errors = null;
    $scope.tarea.$save(this.tarea).finally(function(tarea) {
      controller.errors = tarea.data.error;
      console.log("Hola");
    });
    $(".borrar").val("");
  };

  this.cambiarBoton = function(){
      $('#atras-button').removeClass("btn-primary");
      $('#atras-button').addClass("btn-default");
  };

  this.atras = function () { 
      $window.location.href="#/tareas/";
  };
});

