<?php

    class Usuarios{
        
        public $conexion="";
        
        
        //contiene la conexión a la base de datos
        function __construct() {
            $this->conexion=new mysqli('localhost','root','','proyectodaw');
			
			if($this->conexion->connect_error){
                die('Error de Conexion ('.$this->conexion->connect_errno.')'.$this->conexion->connect_error);
            }
        }
        
        
        //Hace un insert a la base de datos para añadir usuarios
        function nuevoUsuario($usuario,$correo,$dni,$nombre,$apellidos,$fecna,$telefono,$perfil) {
            
            $mensaje = "";
            
            $consulta = "insert into usuarios (USUARIO,CORREO,DNI,NOMBRE,APELLIDOS,FECNA,TELEFONO,PERFIL) values ('$usuario','$correo','$dni','$nombre','$apellidos','$fecna',$telefono,'$perfil')";
            
            if($resultado = $this->conexion->query($consulta)) {
                $mensaje = "Se ha introducido un nuevo usuario";
            }else {
                $mensaje = "No se ha podido introducir el usuario";
            }
            
            return $mensaje;
        }
        
        
        //Hace un update a la base de datos para modificar parámetros de usuario
        function modificarUsuario($id,$usuario,$correo,$dni,$nombre,$apellidos,$fecna,$telefono,$perfil) {
            $mensaje= "";
            
            $consulta = "update usuarios set USUARIO='$usuario',CORREO='$correo',DNI='$dni',NOMBRE='$nombre',APELLIDOS='$apellidos',FECNA='$fecna',TELEFONO=$telefono,PERFIL='$perfil'";
            
            if($respuesta=$this->conexion->query($consulta)) {
                $mensaje = "Se ha modificado el usuario con ID ". $id;
            }else {
                $mensaje = "No se ha podido modificar el usuario";
            }
            
            return $mensaje;
        }
        
        function borrarUsuario($id) {
            $mensaje = "";
            $consulta = "delete from usuarios where ID=$id";
            
            if($respuesta = $this->conexion->query($consuta)) {
                $mensaje = "Se ha borrado el usuario con id " . $id;
            }else {
                $mensaje = "No se ha podido borrar el usuario";
            }
            
            return $mensaje;
        }
        
        function seleccionarTodosLosUsuarios($id,$usuario,$correo,$dni,$nombre,$apellidos,$fecna,$telefono,$perfil) {
            $consulta = "select * from usuarios";
            if($resultado->conexion->query($consulta)) {
                return $resultado;
            }
        }
        
        function seleccionarUnUsuario($id) {
            $consulta = "select * from usuarios where ID=$id";
            if($resultado=$this->conexion->query($consulta)) {
                return $resultado;
            }
        }
        
    }

?>