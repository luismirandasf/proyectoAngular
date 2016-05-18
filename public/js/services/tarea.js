
/*angular.module("tareasApp")
.factory("tarea", function tareaFactory($http) {
  return {
    todas: function(){
      return $http({method: 'GET', url: '/tareas'});
    },
    creartarea: function(tarea){
      return $http({method: 'POST', url: '/tareas', data: tarea});
    },
    encontrar: function(id){
      return $http({method:"GET", url: "/tareas/" + id});
    },
    actualizar: function(tarea){
      return $http({method:"PUT", url: "/tareas", data: tarea});
    },
    borrar: function(id){
      return $http({method:"DELETE", url: "/tareas/" + id});
    }
  }
});*/

angular.module("taskManagerApp")
.factory("tarea", function tareaFactory($resource) {
  return $resource("/tareas/:id", {}, {
    update: {
    method: "PUT"
    }
  });
});

