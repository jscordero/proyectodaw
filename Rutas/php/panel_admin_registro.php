<?php
	require_once("clase_rutas.php");
	$nombre=$_POST['nombre'];
	$km=$_POST['kilometros'];
	$minutos=$_POST['minutos'];
	$inicio=$_POST['inicio'];
	$final=$_POST['destino'];
	$consejos=$_POST['consejos'];	
	$max_res=$_POST['maximo'];
	$mapa=$_POST['mapa'];
	$dificultad=$_POST['dificultad'];
	$destino=$_POST['archivo'];
	
	
	
	

	$enlace=new rutas();
	$resultado=$enlace->nuevaRuta($nombre,$km,$minutos,$inicio,$final,$consejos,$dificultad,0,$destino,$max_res,$mapa);
	
	
	echo $resultado;
	
	
?>