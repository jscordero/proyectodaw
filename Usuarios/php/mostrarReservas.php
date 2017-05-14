<?php
session_start();
include "../../Rutas/php/clase_reservas.php";

$reservas = array();

class mostrarReserva {
    public $fecha = "";
    public $nombreRuta = "";
    public $personas = "";
    
    function __construct($fecha,$nombreRuta,$personas) {
        $this->fecha = $fecha;
        $this->nombreRuta = $nombreRuta;
        $this->personas = $personas;
    }
}

$enlace = new reservas(); 
$visualizar = $enlace->seleccionarTodasReservas($_SESSION['ID']);

if(empty($visualizar)) {
    $respuestaNegativa = ["No tiene reservas"];
    echo(json_encode($respuestaNegativa));
    
}else {
    
    while($fila = $visualizar->fetch_assoc()) {
        $fecha = $fila['FECHA'];
        $nombreRuta = $fila['RUTAS'];
        $personas = $fila['PERSONAS'];
        
        $objeto = new mostrarReserva($fecha,$nombreRuta,$personas);
        
        array_push($reservas,$objeto);
        
    }
    
    header('Content-type: application/json; charset=UTF-8');
	echo json_encode($reservas);
    
}


?>