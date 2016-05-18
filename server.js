var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);//CARGAMOS EL MÓDULO DE SOCKET Y CREAMOS VARIABLE
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cryp = require('crypto-js');

var bodyParser = require('body-parser'); 
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

mongoose.connect('mongodb://localhost/taskManager',function(err){

  if(!err){
    console.log('Se ha conectado a la base de datos del chat');
  }else{
    throw err;
  }
});

//GENERAMOS LA ESTRUCTURA DE LOS DATOS QUE VAMOS A INTRODUCIR EN LA BASE DE DATOS... TODOS LOS MENSAJES VAN A TENER AUTOR, MENSAJE Y FECHA.
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Tarea = new Schema({
  titulo: String,
  tarea: String,
  fecha: String,
  caducada: Boolean,
  borrada: Boolean,
  usuario: String,
  email: String
});
var Tarea = mongoose.model('Tarea', Tarea);

var Usuarios = new Schema({
  nombre: String,
  email: String
});
var Usuarios = mongoose.model('Usuarios', Usuarios);

app.use(express.static('public'));

// Busqueda y devolucion de tareas
app.get('/tareas', function(request, response){

  Tarea.find({},function(err,docs){

    response.json(docs);
      
  });
  
});

// Seleccion de tarea concreta para su edicion
app.get('/tareas/:id', function(request, response){

  console.log(request.params);
  
  Tarea.find({_id:request.params.id},function(err,docs){
    console.log("\nTareas de la base de datos\n\n"+docs[0]);
    /*console.log('tareas a editar: '+docs[0]);*/
    response.json(docs[0]);

  });
});

// Edicion de las tareas
app.put('/tareas/',function(request,response){
    console.log(request.body);

    Tarea.update({_id:request.body._id}, {
      titulo:request.body.titulo,
      usuario:request.body.usuario,
      tarea:request.body.tarea,
      fecha:request.body.fecha,
      caducada:request.body.caducada,
      borrada:request.body.borrada,
      email:request.body.email
    },function (err, doc) {
      console.log("entrada editada");
      response.json({ok:true});
    });
    
});

// Busqueda de usuarios 
app.get('/usuarios',function(request,response){

  Usuarios.find({},function(err,docs){ 
  //BUSCAMOS TODOS LOS USUARIOS DE LA BASE DE DATOS 
      //console.log("El primer usuario en base de datos es:\n\n"+docs[0].nombre);

    response.json(docs);
      
  });
});

app.post('/tareas', function(request, response){
  //response.json(notas);
  console.log(request.query);

  if (request.query.caducada != undefined){

    console.log("El _id vale: "+parseInt(request.query._id))

    Tarea.findByIdAndUpdate(request.query._id, {caducada: true}, function (err, tank) {
      //if (err) return handleError(err);
      //res.send(tank);
      console.log("entrada actualizada");
    });
    /*Tarea.update({_id: request.query._id},{caducada:true},function(err, NumAffected){
      console.log("tarea actualizada");
    });*/
    
  }else if (request.query.borrar != undefined){

    console.log("Estamos en borrar una nota");

    console.log("id de la tarea a borrar "+request.query._id);

    Tarea.remove({_id: request.query._id},function(err, NumAffected){
      console.log("tarea eliminada");

      Tarea.find({email:request.query.email}, function(err,docs){
        console.log(docs.length);
        if (docs.length == 0){

          Usuarios.remove({email: request.query.email},function(err, NumAffected){
            console.log("Se ha eliminado también al usuario por no tener tareas pendientes");
          });
        };
      });
    });
  }else{

    guardarTareaDB(request.query);
  }
  
});

app.listen(9000);


Meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
Dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
function guardarTareaDB(datos){

  fecha = new Date;

  console.log(datos);

  var tarea = new Tarea(
    { 
    titulo: datos.titulo,
    tarea: datos.tarea,
    fecha: Dias[fecha.getDay()]+", "+fecha.getDate()+" de "+Meses[fecha.getMonth()]+" de "+fecha.getFullYear(),
    caducada: false,
    borrada: false,
    email: datos.email,
    usuario: datos.usuario
    }
  );

  //SEGUNDO GUARDAMOS EL MENSAJE EN LA BD Y SACAMOS LA INFO POR EL TERMINAL DEL SERVER
  tarea.save(function (err){
    if(!err){
      console.log('Tarea introducida');
    }else{
      console.log('Error al introducir tarea');
    }
  });

  var usuario = new Usuarios(
  {
    nombre:datos.usuario,
    email:datos.email
  }
  );

  Usuarios.find({email:datos.email}, function(err,docs){

    if(docs.length<1){
        usuario.save(function (err){
          if(!err){
            console.log('Usuario introducido');
          }else{
            console.log('Error al introducir usuario');
          }
        });
    }
  });
  

}






