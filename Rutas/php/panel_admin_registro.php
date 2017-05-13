<?php
	require_once("clase_rutas.php");
	$nombre=$_POST['nombre'];
	$km=$_POST['kilometros'];
	$minutos=$_POST['minutos'];
	$localidad=$_POST['localidad'];
	$consejos=$_POST['consejos'];	
	$max_res=$_POST['maximo'];
	$mapa="".$_POST['mapa'];
	$dificultad=$_POST['dificultad'];
	$destino="";
	$imagen=$_POST['archivo'];	
	
	



	$enlace=new rutas();
	$resultado=$enlace->nuevaRuta($nombre,$km,$minutos,$localidad,$consejos,$dificultad,0,$destino,$max_res,$mapa,$imagen);	
	
	echo $resultado;
	
	
?>