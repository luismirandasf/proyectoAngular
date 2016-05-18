angular.module("taskManagerApp")
.factory("tarea", function tareaFactory($resource) {
  return $resource("/tareas/:id", {}, {
    update: {
    method: "PUT"
    }
  });
});

