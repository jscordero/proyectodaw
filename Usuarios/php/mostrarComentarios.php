<?php	
	include "clase_foro.php";
	$id_ruta=$_POST['id'];	
	$datos=array();
	//$id_ruta=1;
	$enlace=new Foro();
	$resultado=$enlace->seleccionarUnForo($id_ruta);
	
	class comentario{
		public $id="";
		public $nombre="";
		public $nick="";
		public $mensaje="";
		public $fecha="";
	
		
		function __construct($id, $nombre,$nick,$mensaje,$fecha){
			$this->id=$id;
			$this->nombre=$nombre;
			$this->nick=$nick;
			$this->mensaje=$mensaje;
			$this->fecha=$fecha;
						
		}
	}	
	
	for($x=0;$x<count($resultado);$x++){		
		$fila=$resultado[$x];		
		
		$juan = new comentario($fila[0],$fila[1],$fila[2],$fila[3],$fila[4]);
		array_push($datos, $juan);
	}	
	
	header('Content-type: application/json');       
	echo (json_encode($datos));
?>