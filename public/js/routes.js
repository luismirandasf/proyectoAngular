// Este JS linkado a index.html se usa porque la app.js tiene la depenecia ngRoute y tenemos el angular-route.js 
// linkado al html

// une templates con sus correspondientes controladores
angular.module('taskManagerApp')
.config(function($routeProvider){

  $routeProvider

  .when('/', {
    redirectTo: '/tareas'
  })

  // explicación:
  .when('/tareas', { // Al enrutar a tareas 
    templateUrl: '/templates/pages/tareas/index.html',  // cargamos el template index.html
    controller: 'tareasIndexController',                // con el controlador ... que añade acciones a la app
    controllerAs: 'tareasIndex'                         // con el alias (usado en el html)
  })

  .when('/tareas/nueva', {
      templateUrl: 'templates/pages/tareas/nueva.html',
      controller: 'tareaNuevaController',
      controllerAs: 'tareaNuevaCtrl'
    })

  .when('/tareas/:id', {
    templateUrl: 'templates/pages/tareas/tarea-show.html',
    controller: 'tareaShowController',
    controllerAs: 'tareaShowCtrl'
  })

  .when('/usuarios', {
    templateUrl: '/templates/pages/usuarios/index.html', //cargamos el template index.html (usuarios) 
    controller: 'UsuariosIndexController',               // con el controlador ... que añade acciones a la app
    controllerAs: 'UsuariosIndex'                        // con el alias (usado en el html)
  })
  
  .otherwise({redirectTo: '/'});

});
