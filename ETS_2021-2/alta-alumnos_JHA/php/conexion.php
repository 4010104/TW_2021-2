<?php
    $servidor="localhost";
    $usuario="root";
    $clave="";
    $basedatos="alumnos_db";
    $puerto="3306";

    $conexion=mysqli_connect($servidor,$usuario,$clave,$basedatos,$puerto);
    mysqli_set_charset($conexion,"utf8");
?>
