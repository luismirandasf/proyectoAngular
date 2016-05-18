
angular.module('taskManagerApp')
.controller('UsuariosIndexController', function($scope, usuario) { // usuario.js
	var controller = this;
    // el controller hace las acciones--> peticion a la base de datos
    
    controller.usuarios = usuario.query(function(data){
    	//console.log(data[0].x);
    	if(data.length == 0){
    		$("#Usuarios").append("<h2><i>No hay ningun usuario</i></h2>");
    	}
  	});
  
});



