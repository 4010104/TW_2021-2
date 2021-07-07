<?php
/*echo "hola php";
include'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$Programa = (isset($_POST['Programa'])) ? $_POST['Programa'] : '';
$apeMaterno = (isset($_POST['apeMaterno'])) ? $_POST['apeMaterno'] : '';
$apePaterno = (isset($_POST['apePaterno'])) ? $_POST['apePaterno'] : '';*/

if(isset($_POST['opcion'])){
	include "conexion.php";

	switch ($_POST['opcion']) {
		case 'create':
			Createphp($conexion);
			break;
		case 'read':
			Readphp($conexion);
			break;
		case 'update':
			Updatephp($conexion);
			break;
		case 'delete':
			Deletephp($conexion);
			break;
		default:
			$Respuesta["estado"] = 0;
			$Respuesta["mensaje"] = "Accion no valida";
			echo json_encode($Respuesta);
			break;
	}
}else{
	$Respuesta["estado"] = 0;
	$Respuesta["mensaje"] = "Faltan Parametros";
	echo json_encode($Respuesta);
}

function Createphp($conexion){
	$nombre = $_POST['nombre'];
	$Programa = $_POST['Programa'];
  	$apePaterno = $_POST['apePaterno'];
  	$apeMaterno	= $_POST['apeMaterno'];

	$Query = "INSERT INTO alumnos (ID,nombre,apePaterno,apeMaterno,Programa) VALUES (NULL, '".$nombre."', '".$apePaterno."', '".$apeMaterno."', '".$Programa."')";

	$resultado = mysqli_query($conexion,$Query);//crea el registro

	if($resultado>=1)
	{
		$respuesta['estado'] = 1;
		$respuesta['mensaje'] = "Registro correcto";
		$respuesta['id'] = mysqli_insert_id($conexion);
		echo json_encode($respuesta);
	}
	else
	{
		$respuesta['estado'] = 0;
		$respuesta['mensaje'] = "Ocurrio un error";
		$respuesta['id'] = -1;
		echo json_encode($respuesta);
	}
}

function Readphp($conexion){
	$Query = "SELECT * FROM alumnos";
	$Respuesta["altas"]	= array();//nombre array
	$Resultado = mysqli_query($conexion,$Query);

	while($Renglon = mysqli_fetch_array($Resultado)){

		$clasif = array();
		$clasif["ID"] = $Renglon["ID"];
		$clasif["Programa"] = $Renglon["Programa"];
		$clasif["nombre"] = $Renglon["nombre"];

		array_push($Respuesta["altas"], $clasif);
	}
	$Respuesta["estado"] = 1;
	$Respuesta["mensaje"] = "Consulta exitosa";
	echo json_encode($Respuesta);
}

function Updatephp($conexion){
  	$id = $_POST['ID'];
	$nombre = $_POST['nombre'];
	$ProgramaA = $_POST['Programa'];
  	$apePaterno= $_POST['apePaterno'];
  	$apeMaterno	= $_POST['apeMaterno'];
    $Query = "UPDATE alumnos SET  nombre = '".$nombre."', apeMaterno='".$apeMaterno."', apePaterno='".$apePaterno."', Programa='".$ProgramaA."' WHERE ID =".$id;

	mysqli_query($conexion,$Query);

	if(mysqli_affected_rows($conexion)>0){
		$Respuesta['estado'] = 1;
		$Respuesta['mensaje'] = "Actualizo correctamente";
	}else{
		$Respuesta['estado'] = 0;
		$Respuesta['mensaje'] = "Ocurrrio un error";
	}
	echo json_encode($Respuesta);
}

function Deletephp($conexion){
	$Respuesta=array();

	if(isset($_POST['ID'])){

		$ID = $_POST['ID'];
		$Query = "DELETE FROM alumnos WHERE ID =".$ID;
		mysqli_query($conexion,$Query);

		if(mysqli_affected_rows($conexion)>0){
			$Respuesta["estado"] = 1;
			$Respuesta["mensaje"] = "Se elimino correctamente";

		}else{
			$Respuesta["estado"] = 0;
			$Respuesta["mensaje"] = "Ocurrio un error";
		}
	}else{
		$Respuesta["estado"] = 0;
		$Respuesta["mensaje"] = "Falta ID";
	}
	echo json_encode($Respuesta);
}
/*switch($_POST['opcion']){
    case 1://camnoar los numeros por palabra
        $Query = "INSERT INTO alumnos (ID, nombre, apePaterno, apeMaterno, Programa) VALUES(null,'$nombre', '$apeMaterno', '$apePaterno', '$Programa') ";			
        //$resultadoConexion = $conexion->prepare($Query);
        //$resultadoConexion->execute(); 
        $resultado = mysqli_query($conexion,$Query);

            if($resultado>=1)
            {
             $respuesta['estado']= 1; //Para el programador
                $respuesta['mensaje']= "El registro se creo con Exito";// para el profesor1
                $respuesta['id']= mysqli_insert_id($conexion);
                echo json_encode($respuesta);
            }
            else
            {
        $respuesta['estado']= 0;//Para el programador
        $respuesta['mensaje']= "Ocurrio un error desconocido";
        $respuesta['id']= -1; 
        echo json_encode($respuesta);
    }
        //$consulta = "SELECT * FROM alumnos ORDER BY ID DESC LIMIT 1";
        //$resultado = $conexion->prepare($consulta);
        //$resultado->execute();
        //$data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE alumnos SET nombre='$nombre', apeMaterno='$apeMaterno', apePaterno='$apePaterno', Programa='$Programa' WHERE ID='id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM alumnos WHERE ID='$id' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM alumnos WHERE ID='id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM alumnos";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;*/
?>