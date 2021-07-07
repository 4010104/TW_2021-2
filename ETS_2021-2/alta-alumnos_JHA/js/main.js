//alert("Entro al JS");
var IDA = 0;
var IDE = 0;

function Createjs(){
	//alert("Entro a la funcion");
	var nombre_Create = document.getElementById("nombre_create").value;
  	var apePaterno_Create = document.getElementById("apePaterno_create").value;
	var apeMaterno_Create = document.getElementById("apeMaterno_create").value;
	var programaAcademico_Create = document.getElementById("programaAcademico_create").value;

	$.ajax({
	  	method:"POST",
	  	url: "php/crud.php",
	  	data: {
	  		opcion:"create",
	  		nombre: nombre_Create,
      		//apePaterno:apePaterno_Create,
      		apeMaterno: apeMaterno_Create,
      		apePaterno: apePaterno_Create,
      		Programa: programaAcademico_Create

	  	},
	  	success: function( result ) {
	    	resJSON = JSON.parse(result);

	    	if(resJSON.estado==1){
	    		var tabla = $('#example2').DataTable();

        		boton = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#MEditar" onclick="Actualizarjs('+resJSON.ID+');">Editar</button>';
        		boton = boton+'<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#MEliminar" onclick="Eliminarjs('+resJSON.ID+');">Eliminar</button>';

	  			tabla.row.add([
  				  	programaAcademico_Create,
          			nombre_Create,
  					boton
  				]).draw().node().id="row_"+resJSON.id;

          		$('#NuevaDenominacion').modal('hide');
          		alert("Respuesta del servidor" + result);
	    	}else{
      			alert("Respuesta del servidor" + result);
      		}
	  	}
	});
}

function Readjs(){

	$.ajax({
	  	method:"post",
	  	url: "./php/crud.php",
	  	data: {
	    	opcion: "read"
	  	},
	  	success: function( result ) {
	  		var resJSON = JSON.parse(result);

	  		if(resJSON.estado==1){

	  			var tabla = $('#example2').DataTable();

	  			resJSON.altas.forEach(function(alumnos){
	  			boton = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#MEditar" onclick="Actualizarjs('+alumnos.ID+');">Editar</button>';
        		boton = boton+'<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#MEliminar" onclick="Eliminarjs('+alumnos.ID+');">Eliminar</button>';

	  			tabla.row.add([
	  				alumnos.Programa,
	  				alumnos.nombre,
	  				boton
	  				]).draw().node().id ="row_"+alumnos.ID;
	  			});
	  		}else{
	    		alert(resJSON.mensaje);
      		}
    	}
	});
	/*$Query = "SELECT * FROM alumnos";
    $Respuesta["darAlta"] =   array();
    $Resultado  = mysqli_query($conexion,$Query);
    while($Renglon = mysqli_fetch_array($Resultado)){
        $clasif = array();
        $clasif["ID"] = $Renglon["ID"];
        $clasif["nombre"] = $Renglon["nombre"]; 
        $clasif["Programa"] = $Renglon["Programa"];
        array_push($Respuesta["darAlta"], $clasif);
    }
    $Respuesta["estado"] = 1;
    $Respuesta["mensaje"] = "Consulta exitosa";
    echo json_encode($Respuesta);*/
}

function Updatejs() {
  	var id = IDA;
  	var nombre_Update = document.getElementById("nombre_update").value;
  	var Programa_Update = document.getElementById("programaAcademico_update").value;
  	var apeMaterno_Update = document.getElementById("apeMaterno_update").value;
	var apePaterno_Update = document.getElementById("apePaterno_update").value;

  	$.ajax({
      	method: "POST",
      	url: "php/crud.php",
      	data: {
          	opcion: "update",
          	ID: id,
          	nombre: nombre_Update,
          	apeMaterno: apeMaterno_Update,
          	apePaterno: apePaterno_Update,
          	Programa: Programa_Update
      	},
      	success: function(result) {
          	resJSON = JSON.parse(result);
          	if (resJSON.estado==1) {

              	var tabla = $("#example2").DataTable();

             	renglon = tabla.row("#row_"+ id).data();
              	renglon[0] = Programa_Update;
              	renglon[1] = nombre_Update;
              	tabla.row("#row_"+ id).data(renglon);

              	$('#MEditar').modal('hide');
          	}else{
              alert(resJSON.mensaje);
          	}
      	}
  	});
}

function Deletejs(){
	IdEliminar = IDE;

	$.ajax({
		method:"post",
		url: "php/crud.php",
		data: {
			opcion: "delete",
			ID: IdEliminar
		},
		success: function( result ) {
			console.log(result);
			resJSON = JSON.parse(result);

			if(resJSON.estado==1)
			{
				tabla = $("#example2").DataTable();
				tabla.row("#row_"+IdEliminar).remove().draw();

				$('#MEliminar').modal('hide');
			}else{
				alert(resJSON.mensaje);
			}
		}
	});
}

function Actualizarjs(id){
	IDA = id;
	tabla = $("#example2").DataTable();
	renglon = tabla.row("#row_"+IDA).data();
	Programa = renglon[0];
  	nombre = renglon[1];

	$("#programaAcademico_update").val(Programa);
	$("#nombre_update").val(nombre);
}

function Eliminarjs(ID){
  	alert("Desea eliminar ID : "+ID);
	IDE = ID;
}