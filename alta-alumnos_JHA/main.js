$(document).ready(function() {
var user_id, opcion;
opcion = 4;
    
tablaAlumno = $('#tablaAlumnos').DataTable({  
    "ajax":{            
        "url": "bd/crud.php", 
        "method": 'POST',
        "data":{opcion:opcion},
        "dataSrc":""
    },
    "columns":[
        {"data": "user_id"},
        {"data": "username"},
        {"data": "first_name"},
        {"data": "last_name"},
        {"data": "programa"},
        {"data": "status"},
        {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>"}
    ]
});     

var fila;
$('#formAlumnos').submit(function(e){                         
    e.preventDefault();
    username = $.trim($('#username').val());    
    first_name = $.trim($('#first_name').val());
    last_name = $.trim($('#last_name').val());    
    programa = $.trim($('#programa').val());    
    status = $.trim($('#status').val());                            
        $.ajax({
          url: "bd/crud.php",
          type: "POST",
          datatype:"json",    
          data:  {user_id:user_id, username:username, first_name:first_name, last_name:last_name, programa:programa, status:status ,opcion:opcion},    
          success: function(data) {
            tablaAlumnos.ajax.reload(null, false);
           }
        });			        
    $('#modalCRUD').modal('hide');											     			
});

$("#btnNuevo").click(function(){
    opcion = 1; //alta           
    user_id=null;
    $("#formAlumnos").trigger("reset");
    $(".modal-header").css( "background-color", "#17a2b8");
    $(".modal-header").css( "color", "white" );
    $(".modal-title").text("Alta de Alumno");
    $('#modalCRUD').modal('show');	    
});
        
$(document).on("click", ".btnEditar", function(){ //El que es para editar        
    opcion = 2;
    fila = $(this).closest("tr");	        
    user_id = parseInt(fila.find('td:eq(0)').text());	            
    username = fila.find('td:eq(1)').text();
    first_name = fila.find('td:eq(2)').text();
    last_name = fila.find('td:eq(3)').text();
    programa = fila.find('td:eq(4)').text();
    status = fila.find('td:eq(6)').text();
    $("#username").val(username);
    $("#first_name").val(first_name);
    $("#last_name").val(last_name);
    $("#programa").val(programa);
    $("#status").val(status);
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Editar Alumno");		
    $('#modalCRUD').modal('show');		   
});

$(document).on("click", ".btnBorrar", function(){ //El que borra
    fila = $(this);           
    user_id = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;		
    opcion = 3; //eliminar        
    var respuesta = confirm("¿Está seguro de borrar el registro "+user_id+"?");                
    if (respuesta) {            
        $.ajax({
          url: "bd/crud.php",
          type: "POST",
          datatype:"json",    
          data:  {opcion:opcion, user_id:user_id},    
          success: function() {
              tablaAlumnos.row(fila.parents('tr')).remove().draw();                  
           }
        });	
    }
 });
     
}); 