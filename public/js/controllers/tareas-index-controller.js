
angular.module('taskManagerApp')
.controller('tareasIndexController', function($scope, tarea) {
  var controller = this;
  
  controller.tareas = tarea.query(function(data){
    //console.log(data[0].titulo);
    if(data.length == 0){
      $("#Tareas").append("<h2><i>No hay ninguna tarea</i></h2>");
    }
  });
  
  
});

