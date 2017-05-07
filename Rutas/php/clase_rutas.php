<?php
		
	class rutas{
		public $conexion="";
		
		//contructor y conexion a la base de datos.
		function __construct(){
			$this->conexion=new mysqli('localhost','root','','proyectodaw');
			
			if($this->conexion->connect_error){
                die('Error de Conexion ('.$this->conexion->connect_errno.')'.$this->conexion->connect_error);
            }
		}
		//Para panel del Admin
		function nuevaRuta($nombre,$kilometros,$minutos,$localidad, $consejos,$dificultad,$valoracion,$pdf,$max_res,$mapa,$imagen){
			$mensaje="";
			$consulta="insert into rutas (NOMBRE, KILOMETROS, MINUTOS, LOCALIDAD, CONSEJOS, DIFICULTAD, VALORACION, PDF, MAX_RESERVAS, MAPA) values ('".$nombre."','".$kilometros."',".$minutos.",".$localidad.",'".$consejos."',".$dificultad.",".$valoracion.",'".$pdf."',".$max_res.",'".$mapa."')";
			
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Registrada nueva ruta";
			}else{
			
				$mensaje="No se ha podido registrar la ruta";
			}
			return $mensaje;
		}
		//Para panel del Admin
		function modificarRuta($id, $nombre,$kilometros,$minutos,$localidad,$consejos,$dificultad,$valoracion,$pdf,$max_res,$mapa){
			$mensaje="";
			$consulta="update rutas set NOMBRE='".$nombre."', KILOMETROS=".$kilometros.", MINUTOS=".$minutos.", LOCALIDAD=".$localidad.", CONSEJOS='".$consejos."', DIFICULTAD=".$dificultad.", VALORACION=".$valoracion.", PDF='".$pdf."', MAX_RESERVAS=".$max_res.", MAPA='".$mapa."' where ID=".$id;
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Modificada la ruta con id=".$id;
				
			}else{
				$mensaje="No se ha podido modificar la ruta con id=".$id;
			}
			return $mensaje;
		}
		//Para panel del Admin
		function borrarRuta($id){
			$mensaje="";
			$consulta="delete from rutas where id=".$id;
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Borrada la ruta con id=".$id;
			}else{
				$mensaje="No se ha podido borrar la ruta con id=".$id;
			}
			return $mensaje;
		}
		//Para la web
		function seleccionarTodasLasRutas(){			
			$consulta="select rutas.ID as ID, rutas.NOMBRE as NOM, rutas.KILOMETROS as KILOMETROS, rutas.MINUTOS as MINUTOS, localidad.LOCALIDAD as LOC, rutas.CONSEJOS as CONSEJOS, dificultadrutas.DIFICUTAD as DIFICULTAD, rutas.VALORACION as VALORACION, rutas.PDF as PDF,  rutas.MAX_RESERVAS as MAX_RESERVAS, rutas.MAPA as MAPA from rutas  join localidad on localidad.ID_LOCALIDAD = rutas.LOCALIDAD  join dificultadrutas on dificultadrutas.ID_DIFICULTAD = rutas.DIFICULTAD order by rutas.id asc";			
			//$consulta="select * from rutas";
			if($resultado=$this->conexion->query($consulta)){
			
				$datos=array();
				while($fila=$resultado->fetch_assoc()){	
					$enlace=array($fila['ID'],$fila['NOM'],$fila['KILOMETROS'],$fila['MINUTOS'],$fila['LOC'],$fila['CONSEJOS'],$fila['DIFICULTAD'],$fila['VALORACION'],$fila['PDF'],$fila['MAX_RESERVAS'],$fila['MAPA']);
					array_push($datos, $enlace);
	}	
				return $datos;
			}else{
				return "sin resultados";
			}
		}
		//Para la web
		function seleccionarUnaRuta($id){
			$consulta="select rutas.ID as ID, rutas.NOMBRE as NOMBRE, rutas.KILOMETROS as KILOMETROS, rutas.MINUTOS as MINUTOS, localidad.LOCALIDAD as LOCALIDAD, rutas.CONSEJOS as CONSEJOS, dificultadrutas.DIFICUTAD as DIFICULTAD, rutas.VALORACION as VALORACION, rutas.PDF as PDF,  rutas.MAX_RESERVAS as MAX_RESERVAS, rutas.MAPA as MAPA from rutas  join localidad on localidad.ID_LOCALIDAD = rutas.LOCALIDAD  join dificultadrutas on dificultadrutas.ID_DIFICULTAD = rutas.DIFICULTAD  where id=".$id;
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		}
		
		function desconectar(){
			$this->conexion->close();
			return "conexion cerrada";
		}
	
	function seleccionarTodasLasRutasValoracion($ruta){			
			$consulta="select rutas.ID as ID, rutas.NOMBRE as NOM, rutas.KILOMETROS as KILOMETROS, rutas.MINUTOS as MINUTOS, localidad.LOCALIDAD as LOC, rutas.CONSEJOS as CONSEJOS, dificultadrutas.DIFICUTAD as DIFICULTAD, rutas.VALORACION as VALORACION, rutas.PDF as PDF,  rutas.MAX_RESERVAS as MAX_RESERVAS, rutas.MAPA as MAPA from rutas  join localidad on localidad.ID_LOCALIDAD = rutas.LOCALIDAD  join dificultadrutas on dificultadrutas.ID_DIFICULTAD = rutas.DIFICULTAD where nombre='".$ruta."' order by rutas.VALORACION desc";			
			//$consulta="select * from rutas";
			if($resultado=$this->conexion->query($consulta)){
			
				$datos=array();
				while($fila=$resultado->fetch_assoc()){	
					$enlace=array($fila['ID'],$fila['NOM'],$fila['KILOMETROS'],$fila['MINUTOS'],$fila['LOC'],$fila['CONSEJOS'],$fila['DIFICULTAD'],$fila['VALORACION'],$fila['PDF'],$fila['MAX_RESERVAS'],$fila['MAPA']);
					array_push($datos, $enlace);
				}	
				return $datos;
			}else{
				return "sin resultados";
			}
		}
		
		function seleccionarRutasLocalidad($localidad){
			$consulta="select rutas.ID as ID, rutas.NOMBRE as NOM, rutas.KILOMETROS as KILOMETROS, rutas.MINUTOS as MINUTOS, localidad.LOCALIDAD as LOC, rutas.CONSEJOS as CONSEJOS, dificultadrutas.DIFICUTAD as DIFICULTAD, rutas.VALORACION as VALORACION, rutas.PDF as PDF,  rutas.MAX_RESERVAS as MAX_RESERVAS, rutas.MAPA as MAPA from rutas  join localidad on localidad.ID_LOCALIDAD = rutas.LOCALIDAD  join dificultadrutas on dificultadrutas.ID_DIFICULTAD = rutas.DIFICULTAD " ;			
			if($localidad!="Todas"){
				$consulta.="where localidad.LOCALIDAD='".$localidad."'";
			}
			
			if($resultado=$this->conexion->query($consulta)){			
				$datos=array();
				while($fila=$resultado->fetch_assoc()){	
					$enlace=array($fila['ID'],$fila['NOM'],$fila['KILOMETROS'],$fila['MINUTOS'],$fila['LOC'],$fila['CONSEJOS'],$fila['DIFICULTAD'],$fila['VALORACION'],$fila['PDF'],$fila['MAX_RESERVAS'],$fila['MAPA']);
					array_push($datos, $enlace);
	}	
				return $datos;
			}else{
				return "sin resultados";
			}
		}
		
	}

?>