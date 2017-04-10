$(document).ready(function(){   

	cargarRutas()
    mostrar()
	$('#oculto').click(ocultar)
	
	

    var fileExtension = "";
    //función que observa los cambios del campo file y obtiene información
    $('#nuevo :file').change(function(){
        //obtenemos un array con los datos del archivo
        var file = $("#imagen")[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
        
    });
 
    //al enviar el formulario
    $('#registrar').click(function(){
		
        //información del formulario
        var formData = new FormData($(".formulario")[0])       
        //hacemos la petición ajax  
        $.ajax({
            url: 'rutas/php/direccion_imagen.php',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,			
            processData: false,
            
            //una vez finalizado correctamente
            success: function(data){                
				var datos=$("#nuevo_articulo input")	
				var nombre, kilometros, minutos, inicio, destino, consejos, dificultad, num_reservas, direc, mapa
				nombre=datos[0].value
				archivo=data				
				kilometros=datos[1].value
				minutos=parseInt(datos[2].value)
				inicio=datos[3].value
				destino=datos[4].value	
				num_reservas=parseInt(datos[5].value)
				mapa=datos[6].value	
				consejos=$('#nuevo_articulo textarea').val()
				dificultad=$('#nuevo_articulo select').val()	
				
				
				var ruta={
					nombre:nombre,
					kilometros:kilometros,
					minutos:minutos,
					inicio:inicio,
					destino:destino,
					maximo:num_reservas,
					mapa:mapa,
					dificultad:dificultad,
					archivo:archivo,
					consejos:consejos
				}
				
				$.ajax({
					url: 'rutas/php/panel_admin_registro.php',  
					type: 'POST',					
					data: ruta,		
					success: function(data){                
					   $('#mensaje').html(data)
					   cargarRutas()
					  ocultar()
					   $("#nuevo_articulo input:text").each(function(){
						   $(this).val("")
					   })
					   $('#nuevo_articulo textarea').val("")
					   
					}
				})
				
			}
        })
    })
})
 
function mostrar(){
	
	$('#nuevo').click(function(){
			$('#nuevo_articulo').removeClass('ocultar').addClass('mostrar')
	})
} 

function ocultar(){	
	$('#nuevo_articulo').removeClass('mostrar').addClass('ocultar')	
}

//comprobamos si el archivo a subir es un pdf
function isImage(extension)
{
    switch(extension.toLowerCase()) 
    {
        case 'pdf':
            return true;
        break;
        default:
            return false;
        break;
    }
}

function cargarRutas(){
	
	$.ajax({
		url: 'rutas/php/panel_admin_verRutas.php',  
		type: 'POST',
		DataType:'Json',		
		success: function(data){  	
			$('#mensaje2').html("")
			var enlace="<table>"
			for(var x=0;x<data.length;x++){
				enlace+="<tr>"
				enlace += "<td><button class='borrar' id='"+data[x].id+"'>Borrar</button><button class='modificar' id='"+data[x].id+"'>Modificar</button></td><td id='ocultar'>"+data[x].id+"</td>"+"<td>"+data[x].nombre+"</td>"+"<td>"+data[x].km+"</td>"+"<td>"+data[x].minutos+"</td>"+"<td>"+data[x].inicio+"</td>"+"<td>"+data[x].destino+"</td>"+"<td>"+data[x].consejos+"</td>"+"<td>"+data[x].dificultad+"</td>"+"<td>"+data[x].valoracion+"</td>"+"<td>"+data[x].pdf+"</td>"+"<td>"+data[x].max_res+"</td>"+"</tr><tr >"/*."<td colspan=8>"+data[x].mapa+"</td>"*/
				enlace+="</tr>"
			}
			enlace+="</table>"
            
        $('#mensaje2').html(enlace)
		$('.modificar').click(modificar)
		$('.borrar').click(borrar)
		 var fileExtension = "";
		
		}
	})
}

function modificar(){
	$('#edit').click(envioModificar)
	var id=$(this).attr('id')
	var parametro={
		"id":id
	}
	$.ajax({

		url: 'rutas/php/devolverRuta.php',  
		type: 'POST',
		data:parametro,
		DataType:'Json',		
		success: function(data){  	
			var enlace=$('#Modificar_ruta input')	
			$('#Modificar_ruta textarea').val(data.consejos)	
			$('#Modificar_ruta select').val(data.dificultad)			
			$('#Modificar_ruta input[name=id]').val(data.id)
			$('#Modificar_ruta input[name=nombre]').val(data.nombre)
			$('#Modificar_ruta input[name=kilometros]').val(data.km)
			$('#Modificar_ruta input[name=minutos]').val(data.minutos)
			$('#Modificar_ruta input[name=inicio]').val(data.inicio)
			$('#Modificar_ruta input[name=destino]').val(data.final)
			$('#Modificar_ruta input[name=maximo]').val(data.max_res)
			$('#Modificar_ruta input[name=pdf]').val(data.pdf)
			$('#Modificar_ruta input[name=mapa]').val(data.mapa)
			$('#Modificar_ruta input[name=valoracion]').val(data.valoracion)
			
			console.log(data.consejos)
		}
	})	
}

function borrar(){
	
	var id=$(this).attr('id')
	var parametro={
		'id':id
	}
	$.ajax({
		url: 'rutas/php/panel_admin_borrar.php',  
		type: 'POST',
		data:parametro,
		DataType:'Json',		
		success: function(data){  	
			$('#mensaje').html(data)
			cargarRutas()
		}
	})
	
	
}

function envioModificar(){
	var file = $("#Modificar_ruta #imagen")[0].files[0];
			//obtenemos el nombre del archivo
			var fileName = file.name;
			//obtenemos la extensión del archivo
			fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
			//obtenemos el tamaño del archivo
			var fileSize = file.size;
			//obtenemos el tipo de archivo image/png ejemplo
			var fileType = file.type;
			//mensaje con la información del archivo
	var formData = new FormData($(".formulario_edit")[0])       
        //hacemos la petición ajax  
        $.ajax({
            url: 'rutas/php/direccion_imagen.php',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,			
            processData: false,
            
            //una vez finalizado correctamente
            success: function(data){                
				var datos=$("#Modificar_ruta input")	
				var id, valoracion, nombre, kilometros, minutos, inicio, destino, consejos, dificultad, num_reservas, direc, mapa
				nombre=datos[2].value
				id=datos[0].value
				valoracion=datos[1].value
				archivo=data
				archivo=datos[9].value				
				kilometros=datos[3].value
				minutos=parseInt(datos[4].value)
				inicio=datos[5].value
				destino=datos[6].value	
				num_reservas=parseInt(datos[7].value)
				mapa=datos[8].value	
				consejos=$('#Modificar_ruta textarea').val()
				dificultad=$('#Modificar_ruta select').val()	
				console.log(archivo)
				console.log(data)
				var ruta={
					id:id,
					valoracion:valoracion,
					nombre:nombre,
					kilometros:kilometros,
					minutos:minutos,
					inicio:inicio,
					destino:destino,
					maximo:num_reservas,
					mapa:mapa,
					dificultad:dificultad,
					archivo:archivo,
					consejos:consejos
				}
				
				$.ajax({
					url: 'rutas/php/panel_admin_modificar.php',  
					type: 'POST',					
					data: ruta,		
					success: function(data){                
					   
					   cargarRutas()
					  ocultar()
					   $("#Modificar_ruta input:text").each(function(){
						   $(this).val("")
					   })
					   $('#Modificar_ruta textarea').val("")
					   
					}
				})
				
			}
        })
    
}