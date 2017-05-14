<?php
	session_start();
	
	if(empty($_SESSION['nick'])){
		$_SESSION['ID']="";
		$_SESSION['nick'] = "";
        $_SESSION['Correo'] = "";
        $_SESSION['PerfilUsuario'] = "";
		$_SESSION['dni']= "";
		$_SESSION['nombre']= "";
		$_SESSION['apellidos']= "";
		$_SESSION['telefono']= "";
		$_SESSION['fecna']= "";
	}
	
	class session{
		public $id;
		public $usuario;
		public $correo;
		public $perfil;
		public $nombre;
		public $apellidos;
		public $dni;
		public $fecna;
		public $telefono;

		function __construct($id,$usuario,$correo,$perfil,$nombre,$apellidos,$dni,$fecna,$telefono){
			$this->id=$id;
			$this->usuario=$usuario;
			$this->correo=$correo;
			$this->perfil=$perfil;
			$this->nombre=$nombre;
			$this->apellidos=$apellidos;
			$this->dni=$dni;
			$this->fecna=$fecna;
			$this->telefono=$telefono;			
		}
	}

	$enlace=new session($_SESSION['ID'],$_SESSION['nick'],$_SESSION['Correo'],$_SESSION['PerfilUsuario'],$_SESSION['dni'],$_SESSION['nombre'],$_SESSION['apellidos'],$_SESSION['telefono'],$_SESSION['fecna']);
	header('Content-type: application/json');
    echo(json_encode($enlace));
	
?>