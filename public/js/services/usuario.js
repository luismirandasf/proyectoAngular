
angular.module("taskManagerApp")
.factory("usuario", function usuarioFactory($resource) {
  return $resource("/usuarios/:id", {}, {
    update: {
    method: "PUT"
    }
  });	
  // En el resources se incluyen todas las peticiones GET,POST,DELETE,EDIT...
});