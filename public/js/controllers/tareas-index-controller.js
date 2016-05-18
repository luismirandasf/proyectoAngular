
angular.module('taskManagerApp')
.controller('tareasIndexController', function($scope, tarea) {
  var controller = this;
  
  controller.tareas = tarea.query(function(data){
    //console.log(data[0].titulo);
    if(data.length == 0){
      $("#Tareas").append("<h2><i>No hay ninguna tarea</i></h2>");
    }
  });
  
  /*this.eliminarNota = function() {
    console.log(this.tarea);
    var d = new Date(this.tarea.tarea);
    console.log(d.getTime());
    var controller = this;
    controller.errors = null;
    $scope.tarea.$save(this.tarea)/////////////resource
    .catch(function(tarea) {
      controller.errors = tarea.data.error;
    })
    this.tarea = {};
  };
*/
});

