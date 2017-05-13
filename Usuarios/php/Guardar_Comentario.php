<?php
	session_Start();
	include "clase_foro.php";
	$id_ruta=$_POST['ruta'];
	
	$texto=$_POST['comentario'];

	$id_usuario=$_SESSION['ID'];	
	$fecha=date("Y/m/d");
	$enlace=new Foro();
	$resultado=$enlace->nuevoForo($id_ruta,$id_usuario,$texto,"",$fecha);
	echo $resultado;
?>