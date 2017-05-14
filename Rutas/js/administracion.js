var localidades=['Abadía','Aldeanueva del Camino','Baños de Montemayor','Gargantilla','Casas del Monte','Segura del Toro','La Garganta','Hervás']
var dificultades=['Baja', 'Media', 'Alta']
function buscarLoc(local){
	
	var resultado=0
	for (var x=0;x<localidades.length;x++){
		
		if(localidades[x]==local){
			
			resultado=x+1
		}
	}
	console.log(resultado)
	return resultado
}
function buscarDif(dificu){
	var resultado=0
	for (var x=0;x<dificultad.length;x++){
		if(dificultades[x]==dificu){
			resultado=x+1
		}
	}
	return resultado
}

$(document).ready(function(){   
	
	cargarRutas()
    mostrar()
	$('#oculto').click(ocultar)
	
	

    var fileExtension = "";
    //función que observa los cambios del campo file y obtiene información
    $('#nuevo :file').change(function(){
        //obtenemos un array con los datos del archivo
        var file = $("#imagen")[0].files[0]
        //obtenemos el nombre del archivo
        var fileName = file.name
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1)
        //obtenemos el tamaño del archivo
        var fileSize = file.size
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type
        //mensaje con la información del archivo        
    })
	
	
 
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
				var nombre, kilometros, minutos, localidad, consejos, dificultad, num_reservas, direc, mapa
				nombre=datos[1].value
				archivo=data				
				kilometros=datos[2].value
				minutos=parseInt(datos[3].value)					
				num_reservas=parseInt(datos[4].value)
				mapa=datos[5].value	
				consejos=$('#nuevo_articulo textarea').val()
				valor=$('#nuevo_articulo #dificultad').val()
				dificultad=buscarDif(valor)
				valor2=$('#nuevo_articulo #localidad').val()			
				localidad=buscarLoc(valor2)
				
				var ruta={
					nombre:nombre,
					kilometros:kilometros,
					minutos:minutos,
					localidad:localidad,
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
	
	$('#actualizar').click(function(){
		console.log("actualizar")
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
				id=datos[0].value
				nombre=datos[1].value
				kilometros=datos[2].value
				minutos=parseInt(datos[3].value)					
				num_reservas=parseInt(datos[4].value)
				mapa=datos[5].value	
				consejos=$('#nuevo_articulo textarea').val()
				valor=$('#nuevo_articulo #dificultad').val()
				dificultad=buscarDif(valor)
				valor2=$('#nuevo_articulo #localidad').val()			
				localidad=buscarLoc(valor2)	
				if(data=="Sin Fichero"){
					dir_img=datos[7].value
				}else{
					dir_img=data
				}				
				dir_pdf=datos[6].value
				valoracion=datos[8].value
					
				
				
				var ruta={
					id:id,
					nombre:nombre,
					kilometros:kilometros,
					minutos:minutos,
					localidad:localidad,
					maximo:num_reservas,
					mapa:mapa,
					dificultad:dificultad,					
					consejos:consejos,
					dir_img:dir_img,
					dir_pdf:dir_pdf,
					valoracion:valoracion
				}
				console.log(ruta)
				$.ajax({
					url: 'rutas/php/panel_admin_modificar.php',  
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

//comprobamos si el archivo a subir es una imagen
function isImage(extension)
{
    switch(extension.toLowerCase()) 
    {
        case 'jpg': case 'gif': case 'png': case 'jpeg':
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
				enlace += "<td><button class='borrar' id='"+data[x].id+"'>Borrar</button><button class='modificar' id='"+data[x].id+"'>Modificar</button></td><td id='ocultar'>"+data[x].id+"</td>"+"<td>"+data[x].nombre+"</td>"+"<td>"+data[x].km+"</td>"+"<td>"+data[x].minutos+"</td>"+"<td>"+data[x].localidad+"</td>"+"<td>"+data[x].consejos+"</td>"+"<td>"+data[x].dificultad+"</td>"+"<td>"+data[x].valoracion+"</td>"+"<td>"+data[x].pdf+"</td>"+"<td>"+data[x].max_res+"</td>"+"</tr><tr >"+"<td colspan=8>"+data[x].mapa+"</td>"
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
		console.log("dentro")
			var enlace=$('#nuevo_articulo input')	
			$('#nuevo_articulo textarea').val(data.consejos)	
			$('#nuevo_articulo select').val(data.dificultad)			
			$('#nuevo_articulo input[name=id]').val(data.id)
			$('#nuevo_articulo input[name=nombre]').val(data.nombre)
			$('#nuevo_articulo input[name=kilometros]').val(data.km)
			$('#nuevo_articulo input[name=minutos]').val(data.minutos)
			$('#nuevo_articulo input[name=l]').val(data.inicio)
			$('#nuevo_articulo input[name=maximo]').val(data.max_res)
			$('#nuevo_articulo input[name=pdf]').val(data.pdf)
			$('#nuevo_articulo input[name=mapa]').val(data.mapa)
			$('#nuevo_articulo input[name=valoracion]').val(data.valoracion)
			$('#nuevo_articulo input[name=dir_img]').val(data.imagen)
			$('#nuevo_articulo #localidad').val(data.localidad)
			
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

	/*var file = $("#Modificar_ruta #imagen")[0].files[0]

	//obtenemos el nombre del archivo
	var fileName = file.name
	//obtenemos la extensión del archivo
	fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1)
	//obtenemos el tamaño del archivo
	var fileSize = file.size
	//obtenemos el tipo de archivo image/png ejemplo
	var fileType = file.type
	//mensaje con la información del archivo
	var formData = new FormData($(".formulario_edit")[0]) */      
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

/*  *** CALENDARIO ****/
