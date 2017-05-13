//comentario
$(document).ready(function(){
	
	comprobarSession()


    $('#loguearse').on('click',function() {

        var nick = $(this).parent().parent().children().children("#usuario").val();
        var password = $(this).parent().parent().children().children("#passwd").val();
        
        var enviarAjax = {"nick":nick,"passwd":password};
        
         $.ajax({
            data:  enviarAjax,
            url:   'Usuarios/php/loguearCliente.php',
            type:  'post',
             
            beforeSend: function () {
                $("#resultado").html("Procesando, espere por favor...");
            },
            success:  function (response) {
				
				if(response=='["La password introducida no es correcta"]'){
					console.log("Contraseña incorrecta")
				}else if(response=='["El nickname no existe"]'){
					console.log("No existe Nick")
				}else{
                var liLogueo = $("#liLogueo");
                //var ulLogueo = $("ulLogueo");
                var liRegistro = $("#liRegistro");
                //var ulRegistro = $("#ulRegistro");
                var botonAdmin = $("#botonAdmin");
                var desconectar = $("#desc");
                
                var nickLogueado = $("#nickLogueado");
                
                var nickResultado = response.nick;
                var correoResultado = response.correo;
                var perfilResultado = response.perfil;
                
                if(nickResultado == "La rubia") {
                nickLogueado.html(nickResultado);    
                    
                botonAdmin.removeClass("ocultar");
                botonAdmin.addClass("mostrar");
                    
                liLogueo.removeClass("mostrar");
                liLogueo.addClass("ocultar");
                    
                //ulLogueo.removeClass("mostrar");
                //ulLogueo.addClass("ocultar");    
                
                liRegistro.removeClass("mostrar");
                liRegistro.addClass("ocultar");
                    
                //ulRegistro.removeClass("mostrar");
                //ulRegistro.addClass("ocultar");  
                    
                desconectar.removeClass("ocultar");
                desconectar.addClass("mostrar");    
                    
                }else if(nickResultado == "Elhoir" || nickResultado == "Lord Goyito" || nickResultado == "Mario DoubleG") {
                 nickLogueado.html(nickResultado); 
                 botonAdmin.removeClass("mostrar");
                botonAdmin.addClass("ocultar");  
                   
                liLogueo.removeClass("mostrar");
                liLogueo.addClass("ocultar");
                    
                //ulLogueo.removeClass("mostrar");
                //ulLogueo.addClass("ocultar");    
                
                liRegistro.removeClass("mostrar");
                liRegistro.addClass("ocultar");
                    
                //ulRegistro.removeClass("mostrar");
                //ulRegistro.addClass("ocultar");  
                    
                desconectar.removeClass("ocultar");
                desconectar.addClass("mostrar"); 
                    
                }else {
                 nickLogueado.html(nickResultado); 
                 botonAdmin.removeClass("mostrar");
                botonAdmin.addClass("ocultar");
                    
                liLogueo.removeClass("mostrar");
                liLogueo.addClass("ocultar");
                    
                //ulLogueo.removeClass("mostrar");
                //ulLogueo.addClass("ocultar");    
                
                liRegistro.removeClass("mostrar");
                liRegistro.addClass("ocultar");
                    
                //ulRegistro.removeClass("mostrar");
                //ulRegistro.addClass("ocultar");  
                    
                desconectar.removeClass("ocultar");
                desconectar.addClass("mostrar"); 
                
                }
				}
                comprobarSession()
            }
            
            
        });


    });



    $('#insertar').on('click',function() {


        var nick = $(this).parent().parent().children().children("#usuario").val();

        var correo = $(this).parent().parent().children().children("#correo").val();

        var nombre = $(this).parent().parent().children().children("#nombre").val();

        var apellidos = $(this).parent().parent().children().children("#apellidos").val();

        var fecna = $(this).parent().parent().children().children("#fecna").val();

        var telefono = $(this).parent().parent().children().children("#telefono").val();

        var perfil = $(this).parent().parent().children().children("#perfil").val();

        var dni = $(this).parent().parent().children().children("#dni").val();

        var password = $(this).parent().parent().children().children("#passwd").val();

        var enviarAjax = {"nick":nick,"correo":correo,"dni":dni,"nombre":nombre,"apellidos":apellidos,"fecna":fecna,"telefono":telefono,"perfil":perfil,"password":password};


        $.ajax({
            data:  enviarAjax,
            url:   'Usuarios/php/insertarCliente.php',
            type:  'post',
            dataType: 'Json',
            beforeSend: function () {
                $("#resultado").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                $("#resultado").html(response);
            }
            
            
        });

    }); 
    $('#desconectar').on('click',function() {
        //var desconectar = {"desconectar":$(this).val()};
        
        console.log("desconectar");
        
        $.ajax({
            //data:  desconectar,
            url:   'Usuarios/php/desconectarCliente.php',
            type:  'post',
            beforeSend: function () {
                $("#resultado").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                
                 var liLogueo = $("#liLogueo");
                //var ulLogueo = $("ulLogueo");
                var liRegistro = $("#liRegistro");
                //var ulRegistro = $("#ulRegistro");
                var botonAdmin = $("#botonAdmin");
                var desconectar = $("#desc");
                
                botonAdmin.removeClass("mostrar");
                botonAdmin.addClass("ocultar");
                    
                liLogueo.removeClass("ocultar");
                liLogueo.addClass("mostrar");
                    
                //ulLogueo.removeClass("ocultar");
                //ulLogueo.addClass("mostrar");    
                
                liRegistro.removeClass("ocultar");
                liRegistro.addClass("mostrar");
                    
                //ulRegistro.removeClass("ocultar");
                //ulRegistro.addClass("mostrar");  
                    
                desconectar.removeClass("mostrar");
                desconectar.addClass("ocultar"); 
            }
            
            
        });
        
    });

});

function comprobarSession(){
	console.log("Inicio de sesion")
	$.ajax({
		url: 'usuarios/php/clase_sessiones.php',
		type: 'POST',
		DataType:'Json',		
		success: function(data){ 
			var liLogueo = $("#liLogueo");               
            var liRegistro = $("#liRegistro");
			console.log("sessop"+data.usuario)
			if (data.usuario==""){
					liLogueo.removeClass("ocultar");
					liLogueo.addClass("mostrar");
					liRegistro.removeClass("ocultar");
					liRegistro.addClass("mostrar");
				console.log("no hay sesion")
			}else{
				console.log("Session: "+data.usuario)
					
					//var ulRegistro = $("#ulRegistro");
					var botonAdmin = $("#botonAdmin");
					var desconectar = $("#desc");
					
					var nickLogueado = $("#nickLogueado");
					
					var nickResultado = data.usuario;
					var correoResultado = data.correo;
					var perfilResultado = data.perfil;
					
					if(nickResultado == "La rubia") {
					nickLogueado.html(nickResultado);    
					
					botonAdmin.removeClass("ocultar");
					botonAdmin.addClass("mostrar");
						
					liLogueo.removeClass("mostrar");
					liLogueo.addClass("ocultar");
						
					//ulLogueo.removeClass("mostrar");
					//ulLogueo.addClass("ocultar");    
					
					liRegistro.removeClass("mostrar");
					liRegistro.addClass("ocultar");
						
					//ulRegistro.removeClass("mostrar");
					//ulRegistro.addClass("ocultar");  
						
					desconectar.removeClass("ocultar");
					desconectar.addClass("mostrar");    
						
					}else if(nickResultado == "Elhoir" || nickResultado == "Lord Goyito" || nickResultado == "Mario DoubleG") {
					 nickLogueado.html(nickResultado); 
					 botonAdmin.removeClass("mostrar");
					botonAdmin.addClass("ocultar");  
					   
					liLogueo.removeClass("mostrar");
					liLogueo.addClass("ocultar");
						
					//ulLogueo.removeClass("mostrar");
					//ulLogueo.addClass("ocultar");    
					
					liRegistro.removeClass("mostrar");
					liRegistro.addClass("ocultar");
						
					//ulRegistro.removeClass("mostrar");
					//ulRegistro.addClass("ocultar");  
						
					desconectar.removeClass("ocultar");
					desconectar.addClass("mostrar"); 
						
					}else {
					nickLogueado.html(nickResultado); 
					botonAdmin.removeClass("mostrar");
					botonAdmin.addClass("ocultar");
						
					liLogueo.removeClass("mostrar");
					liLogueo.addClass("ocultar");
						
					//ulLogueo.removeClass("mostrar");
					//ulLogueo.addClass("ocultar");    
					
					liRegistro.removeClass("mostrar");
					liRegistro.addClass("ocultar");
						
					//ulRegistro.removeClass("mostrar");
					//ulRegistro.addClass("ocultar");  
						
					desconectar.removeClass("ocultar");
					desconectar.addClass("mostrar"); 
					
					}
			}
			
		}
	})
}