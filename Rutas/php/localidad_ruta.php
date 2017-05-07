<?php
	require_once("clase_rutas.php");
	$enlace=new rutas();
	$localidad=$_POST['localidad'];
	//$localidad="Gargantilla";
	$datos=array();
	$resultado=$enlace->seleccionarRutasLocalidad($localidad);
//print_r($resultado);
	class ruta{
		public $id="";
		public $nombre="";
		public $km="";
		public $minutos="";
		public $localidad="";
		public $consejos="";
		public $pdf="";
		public $max_res="";
		public $valoracion="";
		public $mapa="";
		public $dificultad="";		
		
		function __construct($id, $nombre,$kilometros,$minutos,$localidad,$consejos,$dificultad,$valoracion,$pdf,$max_res,$mapa){
			$this->id=$id;
			$this->nombre=$nombre;
			$this->km=$kilometros;
			$this->minutos=$minutos;
			$this->localidad=$localidad;
			$this->consejos=$consejos;
			$this->pdf=$pdf;
			$this->max_res=$max_res;
			$this->valoracion=$valoracion;
			$this->mapa="dentro"/*$mapa*/;
			$this->dificultad=$dificultad;			
		}
	}	
	
	for($x=0;$x<count($resultado);$x++){		
		$fila=$resultado[$x];		
		//echo $fila[2];fila[1],$fila[2],$fila[3],$fila[4],$fila[5],$fila[6],$fila[7],$fila[8],$fila[9],$fila[10]
		//$enlace=new ruta($fila[0],$fila[1],$fila[2],$fila[3],$fila[4],$fila[5],$fila[6],$fila[7],$fila[8],$fila[9],$fila[10]);
		//array_push($datos, $enlace);
		//print_r($fila[1]);
		$juan = new ruta($fila[0],$fila[1],$fila[2],$fila[3],$fila[4],$fila[5],$fila[6],$fila[7],$fila[8],$fila[9],$fila[10]);
		array_push($datos, $juan);
	}		
	//print_r($datos);
	
	header('Content-type: application/json; charset=UTF-8');
	echo json_encode($datos);

?>