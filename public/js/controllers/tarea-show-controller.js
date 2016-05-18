
angular.module('taskManagerApp')
.controller('tareaShowController', function($scope, $routeParams, $window, tarea) {
  
  var controller = this;
  	controller.tarea = tarea.get({id:$routeParams.id}, function(){
  });
  
  // funcionalidad de los botones
  this.atras = function() {
    $window.location.href="#/tareas/"; // Redireccion a tareas tras guardar la tarea
  }; 

  var viejo_titulo = "";
  var vieja_descripcion = "";

  this.mostrar = function () { 
  	
  	if($(".button-edit").hasClass("hidden")){
  		$(".button-edit").toggleClass('hidden');
  	}else{
  		$(".button-edit").addClass("hidden");
  	}
  	
  	viejo_titulo = controller.tarea.titulo;
  	vieja_descripcion = controller.tarea.tarea;
	controller.tarea.titulo = "";
  	controller.tarea.tarea = "";

  	$(".edicion").toggleClass('hidden');
  	
  	$(".viejo_titulo").toggleClass('hidden');
 	$(".viejo_titulo").last().append(viejo_titulo);

 	$(".vieja_descripcion").toggleClass('hidden');
 	$(".vieja_descripcion").last().append(vieja_descripcion);
  	
  	
  };

  this.cancelar = function () { 
  	controller.tarea.titulo = viejo_titulo;
  	controller.tarea.tarea = vieja_descripcion;
  	viejo_titulo = "";
  	vieja_descripcion = "";

  	$(".viejo_titulo").last().text("");
  	$(".vieja_descripcion").last().text("");
  	$(".viejo_titulo").last().append("<i>Antiguo Titulo:</i>");
  	$(".vieja_descripcion").last().append("<i>Antigua descripción:</i>");

  	$(".edicion").toggleClass('hidden');
  	$(".viejo_titulo").toggleClass('hidden');
 	$(".vieja_descripcion").toggleClass('hidden');
  	
  	$(".button-edit").toggleClass('hidden');
  	
  };

  this.editar = function(){
  	
  	console.log(this.tarea._id);
 
  	var controller = this;
  	controller.errors = null;

    tarea.update({id:tarea._id},this.tarea,function(data){

      console.log(data.ok);

    });/////////////resource
    
    this.tarea = {};
    $window.location.href="#/tareas/";
  };

  
});
