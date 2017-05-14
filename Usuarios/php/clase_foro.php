<?php

class Foro {
    public $conexion="";

    function __construct() {
        $this->conexion=new mysqli('localhost','root','','proyectodaw');

        if($this->conexion->connect_error){
            die('Error de Conexion ('.$this->conexion->connect_errno.')'.$this->conexion->connect_error);
        }
    }

    function nuevoForo($idRuta,$idUsuario,$mensaje2,$imagen,$fecha) {
        $mensaje = "";

        $consulta = "insert into foro (ID_RUTA,ID_USUARIO,MENSAJE,IMAGEN,FECHA) values ($idRuta,$idUsuario,'".$mensaje2."','$imagen','$fecha')";
        if($resultado=$this->conexion->query($consulta)) {
            $mensaje = "Se ha introducido un nuevo foro";
        }else {
            $mensaje = "No se ha podido introducir el foro";
        }

        return $consulta;
    }

    function modificarForo($id,$idRuta,$idUsuario,$mensaje,$imagen,$fecha) {
        $mensaje="";

        $consulta = "update foro set ID='$id',ID_RUTA=$idRuta,ID_USUARIO=$idUsuario,MENSAJE='$mensaje',IMAGEN='$imagen',FECHA='$fecha' where ID=$id";

        if($respuesta=$this->conexion->query($consulta)) {
            $mensaje="Se ha modificado el foro con ID " . $id;
        }else {
            $mensaje="No se ha podido modificar el foro";
        }

        return $mensaje;
    }

    function borrarForo($id) {
        $mensaje="";
        $consulta = "delete from foro where ID=$id";
        if($respuesta=$this->conexion->query($consulta)) {
            $mensaje="Se ha borrado el foro con ID " . $id;
        }else {
            $mensaje="No se ha podido borrar el foro";
        }
    }

    function seleccionarUnForo($id_ruta) {
        $consulta = "select foro.id, rutas.nombre as nombre, usuarios.usuario as nick, mensaje, fecha from foro join rutas on rutas.id  = foro.id_ruta join usuarios on usuarios.id = foro.id_usuario where foro.id_ruta=".$id_ruta." order by foro.fecha desc, foro.id desc";
        if($resultado=$this->conexion->query($consulta)) {
		
			$datos=array();
			while($fila=$resultado->fetch_assoc()){	
				$enlace=array($fila['id'],$fila['nombre'],$fila['nick'],$fila['mensaje'],$fila['fecha']);
				array_push($datos, $enlace);
            
			}
			return $datos;
		}
    }

    function desconectar(){
        $this->conexion->close();
        return "conexion cerrada";
    }
}

?>