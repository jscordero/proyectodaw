$(document).ready(function() {

    $("#desplegableUpdate").on('click',function() {
        if($('#divUpdate').hasClass('ocultar2')) {
            $('#divUpdate').removeClass('ocultar2');
            $('#divUpdate').addClass('mostrar2');
        }else if($('#divUpdate').hasClass('mostrar2')) {
            $('#divUpdate').removeClass('mostrar2');
            $('#divUpdate').addClass('ocultar2');
        }

        $.ajax({

            url:   'Usuarios/php/selectPerfilPrevioUpdate.php',
            type:  'post',
            dataType: 'Json',
            beforeSend: function () {
                $("#resultado").html("Procesando, espere por favor...");
            },
            success:  function (response) {

                var passwd = response.password;
                var nombre = response.nombre;
                var apellidos = response.apellidos;
                var fecna = response.fecna;
                var telefono = response.telefono;

                $("#passwdUpdate").val(passwd);
                $("#nombreUpdate").val(nombre);
                $("#apellidosUpdate").val(apellidos);
                $("#fecnaUpdate").val(fecna);
                $("#telefonoUpdate").val(telefono);
            }

        });
    })

    $('#update').on('click',function() {

        console.log("Dentro de la función");

        var password = $(this).parent().parent().children().children("#passwdUpdate").val(); 

        var nombre = $(this).parent().parent().children().children("#nombreUpdate").val();
        console.log("Este es el nombre: " + nombre);
        var apellidos = $(this).parent().parent().children().children("#apellidosUpdate").val();

        var fecna = $(this).parent().parent().children().children("#fecnaUpdate").val();

        var telefono = $(this).parent().parent().children().children("#telefonoUpdate").val();







        var enviarAjax = {"nombre":nombre,"apellidos":apellidos,"fecna":fecna,"telefono":telefono,"password":password};

        console.log("Esto se va a enviar: " + enviarAjax);

        $.ajax({
            data:  enviarAjax,
            url:   'Usuarios/php/editarPerfilCliente.php',
            type:  'post',
            dataType: 'Json',
            beforeSend: function () {
                $("#resultado").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                console.log(response);
            }


        });
    });
    
   
    
    
     $.ajax({
            
            url:   'Usuarios/php/mostrarReservas.php',
            type:  'post',
            dataType: 'Json',
            beforeSend: function () {
                $("#resultado").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                console.log(response);
                 var reservas = $('#reservas');
                var tabla = "<table id='tablaReservas'><caption><h2>Tus reservas:</h2></caption><tr><th>Fecha</th><th>Ruta</th><th>Personas</th></tr>"
                for(var i = 0; i < response.length; i++) {
                    tabla += "<tr>";
                    tabla += "<td style='width:150px;'>" + response[i].fecha; + "</td>";
                    tabla += "<td>" + response[i].nombreRuta; + "</td>";
                    tabla += "<td style='width:450px;'>" + response[i].personas; + "</td>";
                    tabla += "</tr>";
                }
                tabla += "</table>";
                reservas.html(tabla);
                tablaEstilos = $("#tablaReservas");
                tablaEstilos.children.children.style = "border:2px solid red;";
            }


        });
    
});